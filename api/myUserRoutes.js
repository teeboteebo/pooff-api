const express = require("express")
const User = require("../schemas/User")

const router = express.Router()

router.get('/api/myuser', async (req, res) => {
  let user = await User.findById(req.session.user._id).populate('children').populate('children.transactions').exec()
  res.json(user)
})
router.put('/api/myuser', async (req, res) => {
  let user = await User.findById(req.session.user._id)
  let updatedUser = {...req.body}
  // if role somehow is tried to manipulate, delete the role from body
  if(updatedUser.role) delete updatedUser.role
  Object.assign(user, updatedUser)
  await user.save()
  res.json(user)
})

router.put('/api/godaddy', async (req, res) => {
  let user = await User.findById(req.session.user._id)
  user.role = 'parent'
  await user.save()
  res.json(user)
})


module.exports = router




