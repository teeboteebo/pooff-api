const express = require("express")
const User = require("../schemas/User")
const checkBalance = require('./checkBalance')

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
  const balance = await checkBalance(req.session.user._id)  
  res.json(balance)
})

module.exports = router