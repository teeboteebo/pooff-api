const express = require('express')
const User = require('../schemas/User')
const encryptPassword = require('../config/encryptPassword')
const checkBalance = require('./checkBalance')

const router = express.Router()

router.get('/api/myuser', async (req, res) => {
  let user = await User.findById(req.session.user._id)
    .populate('transactions')
    .populate('children')
    .exec()
  res.json(user)
})
router.put('/api/myuser', async (req, res) => {
  let user = await User.findById(req.session.user._id)
  let updatedUser = { ...req.body }
  // if role somehow is tried to manipulate, delete the role from body
  if (updatedUser.role) delete updatedUser.role
  await Object.assign(user, updatedUser)
  await user.save()
  res.json(user)
})

router.put('/api/godaddy', async (req, res) => {
  let newUser = new User({
    ...req.body,
  })

  let error
  await newUser.save().catch(err => (error = err + ''))
  let thisUser = await User.findById(req.session.user._id)
  thisUser.role = 'parent'
  thisUser.children.push(newUser._id)
  await thisUser.save().catch(err => (error = err + ''))

  res.json(error ? { error } : { success: 'User created' })
})

router.get('/api/mychildren', async (req, res) => {
  const user = await User.findById(req.session.user._id)
  const myChildrenTransactions = []
  for (let child of user.children) {
    const me = await User.findById(child)
      .populate({
        path: 'transactions',
        populate: ({
          path: 'sender receiver',
          select: 'firstName lastName _id'
        })
      })
      .select('transactions firstName lastName phone active')
      .exec()
    me.transactions.forEach(transaction => {
      if (JSON.stringify(transaction.sender._id) === JSON.stringify(me._id)) {
        transaction.amount = transaction.amount * -1
      }
    })
    me.transactions.sort((a, b) => (a.date < b.date ? 1 : -1))
    let meJSON = JSON.stringify(me)
    const meObj = JSON.parse(meJSON)
    meObj.balance = await checkBalance(me._id)
    myChildrenTransactions.push(meObj)
  }
  res.json(myChildrenTransactions)
})

// GET all favourites
router.get('/api/myuser/favorites', async (req, res) => {
  const thisUserFavorites = await User.findById(req.session.user._id)
  res.json(thisUserFavorites.favorites)
})

// PUT new favourite
router.put('/api/myuser/favorites', async (req, res) => {
  const thisUser = await User.findById(req.session.user._id)
  const newFavorite = { ...req.body }
  thisUser.favorites.push(newFavorite)
  await thisUser.save()
  res.json('Favorite saved')
})

router.delete('/api/myuser/favorites/:phone', async (req, res) => {
  const thisUser = await User.findById(req.session.user._id)
  let favoriteToDelete = thisUser.favorites.findIndex(favorite => JSON.stringify(favorite.phone) === JSON.stringify(req.params.phone))
  thisUser.favorites.splice(favoriteToDelete, 1)
  await thisUser.save()
  res.json(thisUser.favorites)
})

module.exports = router
