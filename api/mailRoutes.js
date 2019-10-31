const express = require("express")
const nodemailer = require("nodemailer")
const { mail } = require("../config/config")
const Link = require("../schemas/Link")
const resetPwTemplate = require("../mail/resetPwTemplate")
const welcomeTemplate = require("../mail/welcomeTemplate")
const uuidv4 = require("uuid/v4")
let mailOptions = {}

const router = express.Router()

router.post("/api/send", async function(req, res, next) {
  let link = uuidv4()
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true,
    auth: {
      user: "apikey",
      pass: mail
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  switch (req.body.subject) {
    case "Välkommen till Pooff!":
      mailOptions = {
        from: `"Pooff" <pooffmoney@gmail.com>`,
        replyTo: "pooffmoney@gmail.com",
        to: req.body.email,
        subject: req.body.subject,
        html: welcomeTemplate(link, () => {})
      }
      break
    case "Återställ lösenord":
      mailOptions = {
        from: `"Pooff" <pooffmoney@gmail.com>`,
        replyTo: "pooffmoney@gmail.com",
        to: req.body.email,
        subject: req.body.subject,
        html: resetPwTemplate(link, () => {})
      }
      break
    default:
      smailOptions = {
        from: `"Pooff" <pooffmoney@gmail.com>`,
        replyTo: "pooffmoney@gmail.com",
        to: req.body.email,
        subject: req.body.subject,
        html: req.body.message
      }
  }

  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.error("there was an error: ", err)
    } else {
      console.log("here is the res: ", res)
    }
  })

  let linkObj = new Link({ user: req.body.id, link, time: Date.now() })

  await linkObj.save(console.log("SAVED"))

  await res.status(200).send(linkObj)
})

module.exports = router
