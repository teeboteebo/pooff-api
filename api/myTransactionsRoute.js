const express = require("express")
const Transaction = require("../schemas/Transaction")
const User = require("../schemas/User")

const router = express.Router()

// let all user roles have access get mytransactions
// because the "acl" in this case take place inside the route
// by only looking up transactions belonging to the logged in user
router.get('/api/mytransactions', async (req, res) => {
  let user = await User.findById(req.session.user._id).populate('transactions').exec()
  if (!user) { res.json([]); return; }
  console.log(user);
  
  user.transactions.forEach(transaction => {
    let userId = JSON.stringify(req.session.user._id)
    let sender = JSON.stringify(transaction.sender)
    if (sender === userId) {
      transaction.amount = transaction.amount * -1
      // If sender = user, flip the amount
    }
  })
 
  user.transactions.sort((a, b) => a.date < b.date ? 1 : -1);
  res.json(user.transactions);
  // console.log(allMyTransactions);

})

// Get my user balance
router.get('/api/mytransactions/balance', async (req, res) => {
  let user = await User.findById(req.session.user._id).populate('transactions').exec()

  if (!user) { res.json([]); return; }

  let balance = 0

  console.log(user.transactions);


  user.transactions.forEach(transaction => {
    let userId = JSON.stringify(req.session.user._id)
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

  res.json(balance)
})

module.exports = router