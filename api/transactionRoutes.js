const express = require("express")
const Transaction = require("../schemas/Transaction")
const User = require("../schemas/User")
const checkBalance = require('./checkBalance')
const router = express.Router()


router.post('/api/transactions', async (req, res) => {  
  let balance = await checkBalance(req.session.user._id)
  
  let { receiver, amount, message } = req.body
  let sender = await User.findById(req.session.user._id)
  receiver = await User.findOne({ phone: receiver })
  let result = 'Success'
  if (balance >= amount) {
    let newTransaction = new Transaction({
      sender: sender._id,
      receiver: receiver._id,
      amount,
      message
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
  } else {
    result = 'Not enough funds'
  }
  res.json(result)
})

module.exports = router