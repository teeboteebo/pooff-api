const express = require("express")
const Link = require("../schemas/Link")

const router = express.Router()

router.get("/api/links/:link", async (req, res) => {
  const link = await Link.findOne({ link: req.params.link })
  if (link) {
    await res.status(200).send(link)
  } else {
    res.send({ error: "No link found" })
  }
})

router.delete("/api/links/:email", async (req, res) => {
  try {
    const link = await Link.findOne({ email: req.params.email })
    link.delete()
    res.status(200).send("Link deleted!")
  } catch (err) {
    res.send("No such link")
  }
})

module.exports = router
