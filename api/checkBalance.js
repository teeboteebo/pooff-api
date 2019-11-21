const User = require("../schemas/User")

const checkBalance = async sessionUserId => {
  let user = await User.findById(sessionUserId).populate('transactions').exec()

  if (!user) { return; }

  let balance = 0

  user.transactions.forEach(transaction => {
    let userId = JSON.stringify(sessionUserId)
    let receiver = JSON.stringify(transaction.receiver)
    let sender = JSON.stringify(transaction.sender)

    if (receiver === userId) {
      balance += transaction.amount

    } else if (sender === userId) {
      balance -= transaction.amount

    }
  })

  return balance
}
module.exports = checkBalance