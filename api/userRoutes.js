const express = require("express")
const User = require("../schemas/User")

const router = express.Router()

router.get('/api/users', async (req, res) => {
  let allUsers = await User.find()
  res.status(200).send(allUsers)
})
router.post('/api/users', async (req, res) => {
  let newUser = new User({
    username:   'DonPooFF',
    role:       'Don Pooff',
    password:   '123',
    firstName:  'Don',
    lastName:   'Pooff',
    email:      'pooff@gmail.com',
    phone:      '070donpooff88',
    balance:    10000000,
    darkMode:   true
    })
  try {
    await newUser.save()
    await res.status(200).send({'SAVED': newUser})
  }
  catch(err) {
    res.send(err)
  }
})

router.delete('/api/users/delete', async (req, res) => {
  try {
    let userToDelete = await User.findById(req.body.id)
    userToDelete.delete()
    res.status(200).send('User found and deleted!')
  }
  catch(err) {
    res.send('No such user found')
  }
})

module.exports = router
