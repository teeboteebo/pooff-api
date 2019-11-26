const express = require("express")
const encryptPassword = require("../config/encryptPassword")
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

router.get("/api/active/:username", async (req, res) => {
    let user = await User.findOne({ username: req.params.username })
    console.log(user)
  if (user) {
    res.status(200).send(user)
  }
  else{
    res.send({error: "error"})
  }
})

router.get("/api/email/:email", async (req, res) => {
  let user = await User.find({ email: req.params.email })
  res.status(200).send(user)
})

router.post("/api/users", async (req, res) => {
  // we should check that the same username does
  // not exist... let's save that for letter
  if (typeof req.body.password !== "string" || req.body.password.length < 6) {
    res.json({ error: "Password to short" })
    return
  }

  let role = "user"
  if (req.session.user && req.session.user.role === "admin")
    role = req.body.role || "user"

  let user = new User({
    ...req.body,
    password: encryptPassword(req.body.password),
    role,
  })
  let error
  let resultFromSave = await user.save().catch(err => (error = err + ""))
  res.json(error ? { error } : { success: "User created" })
})

router.put("/api/activate/:id/", async (req, res) => {
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
  req.body.password = await encryptPassword(req.body.password)
  Object.assign(user, req.body)
  await user.save()
  res.json(user)
})

router.put("/api/child/:id/", async (req, res) => {
  let user = await User.findById(req.params.id)
  req.body.password = await encryptPassword(req.body.password)
  Object.assign(user, req.body)
  await user.save()
  res.json(user)
})

router.put("/api/password/:id", async (req, res) => {
  let user = await User.findById(req.params.id)
  req.body.password = await encryptPassword(req.body.password)
  Object.assign(user, req.body)
  await user.save()
  res.json(user)
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
