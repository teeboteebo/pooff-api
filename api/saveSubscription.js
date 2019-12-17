const User = require('../schemas/User')

module.exports = async (userId, subscription) => {
  let user = await User.findOne({ _id: userId })
  if (!user) { return }
  // check if the subscription is already stored with
  // the user in the db
  for (let sub of user.subscriptions) {
    if (JSON.stringify(subscription) === JSON.stringify(sub)) {
      // don't add since already in db
      return
    }
  }
  // add the subscription to the user
  user.subscriptions.push(subscription)
  await user.save()
}