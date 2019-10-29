const express = require("express")
const User = require("../schemas/User")

const router = express.Router()

router.get("/api/users", async (req, res) => {
  let allUsers = await User.find()
  res.status(200).send(allUsers)
})

router.get("/api/users/id/:id", async (req, res) => {
  let user = await User.findById(req.params.id)
  res.status(200).send(user)
})

router.post("/api/users", async (req, res) => {
  // we should check that the same username does
  // not exist... let's save that for letter
  if (typeof req.body.password !== "string" || req.body.password.length < 6) {
    res.json({ error: "Password to short" })
    return
  }
  let user = new User({
    ...req.body
    // password: encryptPassword(req.body.password)
  })
  let error
  let resultFromSave = await user.save().catch(err => (error = err + ""))
  res.json(error ? { error } : { success: "User created" })
})

router.put("/api/users/activate/:id/", async (req, res) => {
  let user = await User.findById(req.params.id)

  user.active = true
  user.save(function(err) {
    if (err) {
      next(err)
    } else {
      res.status(200).send()
    }
  })
})

router.put("/api/users/deactivate/:id/", async (req, res) => {
  let user = await User.findById(req.params.id)

  user.active = false
  user.save(function(err) {
    if (err) {
      next(err)
    } else {
      res.status(200).send()
    }
  })
})

router.put("/api/users/id/:id/edit", async (req, res) => {
  let user = await User.findById(req.params.id)
  user.username = req.body.content.username
  user.role = req.body.content.role
  user.password = req.body.content.password
  user.firstName = req.body.content.fistName
  user.lastName = req.body.content.lastName
  user.email = req.body.content.email
  user.phone = req.body.content.phone
  user.darkMode = req.body.content.darkMode
  user.history = req.body.content.history

  user.save(function(err) {
    if (err) {
      next(err)
    } else {
      res.status(200).send()
    }
  })
})

router.delete("/api/users/delete/all", async (req, res) => {
  try {
    let usersToDelete = await User.find()
    usersToDelete.delete()
    res.status(200).send("All users terminated!")
  } catch (err) {
    res.send("Could not delete users")
  }
})

router.delete("/api/users/delete", async (req, res) => {
  try {
    let userToDelete = await User.findById(req.body.id)
    userToDelete.delete()
    res.status(200).send("User found and deleted!")
  } catch (err) {
    res.send("No such user found")
  }
})

module.exports = router
