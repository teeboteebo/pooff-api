const express = require("express")
const User = require("../schemas/User")

const router = express.Router()

router.get('/api/register', async (req, res) => {
  const users = await User.find().select('username email phone')
  res.json(users)
})

module.exports = router