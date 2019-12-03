const express = require("express")
const Transaction = require("../schemas/Transaction")
const User = require("../schemas/User")
const checkBalance = require("./checkBalance")

const router = express.Router()

router.get("/api/transactions", async (req, res) => {
  let allTransactions = await Transaction.find()
  res.json(allTransactions)
})

router.post("/api/transactions", async (req, res) => {
  let { receiver, amount, message } = req.body
  let sender = await User.findById(req.session.user._id)
  receiver = await User.findOne({ phone: receiver })

  let balance = await checkBalance(req.session.user._id)
  let result = "Success"
  if ((amount > 0 && balance >= amount) || sender.role === "bank") {
    let newTransaction = new Transaction({
      sender: sender._id,
      receiver: receiver._id,
      amount,
      message,
    })

    try {
      await newTransaction.save()
      receiver.transactions.push(newTransaction)
      sender.transactions.push(newTransaction)
      try {
        await receiver.save()
        await sender.save()

        // using the global sendSSE set in index.js
        global.sendSSE( req => req.session.user && req.session.user.phone === receiver.phone, 'payment', {
          sender: sender.firstName + " " + sender.lastName,
          amount,
          message
        });
         // send sse to client

      } catch (err) {
        result = err
      }
    } catch (err) {
      result = err
    }
  } else {
    result = "Not enough funds"
  }
  res.json(result)
})

module.exports = router
