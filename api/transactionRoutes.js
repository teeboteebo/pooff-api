const express = require("express")
const Transaction = require("../schemas/Transaction")
const User = require("../schemas/User")

const router = express.Router()


router.post('/api/transactions', async (req, res) => {
  let balance = await getBalance(req.session.user._id)
  
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

async function getBalance(sessionUserId) {
  let user = await User.findById(sessionUserId).populate('transactions').exec()

  if (!user) { return; }

  let balance = 0

  console.log(user.transactions);


  user.transactions.forEach(transaction => {
    let userId = JSON.stringify(sessionUserId)
    let receiver = JSON.stringify(transaction.receiver)
    let sender = JSON.stringify(transaction.sender)

    if (receiver === userId) {
      balance += transaction.amount
      console.log('adding balance');

    } else if (sender === userId) {
      balance -= transaction.amount
      console.log('subtracting balance');

    }
  })

  return balance
}

module.exports = router