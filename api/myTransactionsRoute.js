const express = require('express')
const User = require('../schemas/User')
const Transaction = require('../schemas/Transaction')
const checkBalance = require('./checkBalance')

const router = express.Router()

// let all user roles have access get mytransactions
// because the "acl" in this case take place inside the route
// by only looking up transactions belonging to the logged in user
router.get('/api/mytransactions', async (req, res) => {
  if (!req.session.user) {
    res.json([])
    return
  }
  let user = await User.findById(req.session.user._id)
    .populate({
      path: 'transactions',
      populate: {
        path: 'sender receiver',
        select: 'firstName lastName'
      }
    })
    .exec()
  // If sender === user - flip the amount
  user.transactions.forEach(transaction => {
    if (JSON.stringify(transaction.sender._id) === JSON.stringify(transaction.receiver._id)) delete transaction
    if (JSON.stringify(transaction.sender._id) === JSON.stringify(req.session.user._id)) transaction.amount = transaction.amount * -1
  })
  user.transactions.sort((a, b) => (a.date < b.date ? 1 : -1))
  res.json(user.transactions)
})

router.get('/api/mytransactions/id/:id', async (req, res) => {
  if (!req.session.user) {
    res.json([])
    return
  }
  let user = await User.findById(req.session.user._id)
    .populate({
      path: 'transactions',
      populate: {
        path: 'sender receiver',
        select: 'firstName lastName'
      }
    })
    .exec()
  // If sender === user - flip the amount
  user.transactions.forEach(transaction => {
    if (JSON.stringify(transaction.sender._id) === JSON.stringify(req.session.user._id)) transaction.amount = transaction.amount * -1
  })
  let theTransaction = user.transactions.find(transaction => transaction._id == req.params.id)

  res.json(theTransaction)
})


// Get my user balance
router.get('/api/mytransactions/balance', async (req, res) => {
  // console.log(req.session.user)
  const balance = await checkBalance(req.session.user._id)
  res.json({ balance })
})

// Get some cash
router.post('/api/mytransactions/topup', async (req, res) => {
  let { sender, amount } = req.body
  let receiver = await User.findById(req.session.user._id)
  sender = await User.findOne({ phone: sender })
  let result = 'Success'
  let newTransaction = new Transaction({
    sender: sender._id,
    receiver: receiver._id,
    amount,
    message: 'Top up'
  })
  try {
    await newTransaction.save()
    receiver.transactions.push(newTransaction)
    sender.transactions.push(newTransaction)
    try {
      await receiver.save()
      await sender.save()
    }
    catch (err) {
      result = err
    }
  }
  catch (err) {
    result = err
  }
  res.json(result)
})

//Return first and lastname based on phonenumber

router.get('/api/mytransactions/number/:number', async (req, res) => {
  let foundUser = await User.findOne({ phone: req.params.number }).select('firstName lastName').exec()
  res.json(foundUser)
})

module.exports = router
