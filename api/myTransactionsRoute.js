const express = require('express')
const User = require('../schemas/User')
const Transaction = require('../schemas/Transaction')
const checkBalance = require('./checkBalance')

const router = express.Router()

// let all user roles have access get mytransactions
// because the "acl" in this case take place inside the route
// by only looking up transactions belonging to the logged in user
router.get('/api/mytransactions', async (req, res) => {
  let user = await User.findById(req.session.user._id)
  if (!user) {
    res.json([])
    return
  }
  let userTransactionsSent = await Transaction.find({ sender: req.session.user._id }).populate('sender').populate('receiver').exec()
  userTransactionsSent.forEach(transaction => {
    transaction.amount = transaction.amount * -1
  })
  let userTransactionsReceived = await Transaction.find({ receiver: req.session.user._id }).populate('sender').populate('receiver').exec()

  let allUserTransactions = userTransactionsSent.concat(userTransactionsReceived)

  allUserTransactions.sort((a, b) => (a.date < b.date ? 1 : -1))
  res.json(allUserTransactions)
  // console.log(allMyTransactions);
})

router.get('/api/mytransactions/id/:id', async (req, res) => {
  console.log('running get one trans');
  
  let user = await User.findById(req.session.user._id)
  if (!user) {
    res.json([])
    return
  }
  let userTransactionsSent = await Transaction.find({ sender: req.session.user._id }).populate('sender').populate('receiver').exec()
  let userTransactionsReceived = await Transaction.find({ receiver: req.session.user._id }).populate('sender').populate('receiver').exec()
  let allUserTransactions = userTransactionsSent.concat(userTransactionsReceived)

  let theTransaction = allUserTransactions.find(transaction => transaction._id == req.params.id)  
  res.json(theTransaction)

})


// Get my user balance
router.get('/api/mytransactions/balance', async (req, res) => {
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
