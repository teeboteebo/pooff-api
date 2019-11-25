const express = require("express")
const nodemailer = require("nodemailer")
const { mail } = require("../config/config")
const Link = require("../schemas/Link")
const resetPwTemplate = require("../mail/resetPwTemplate")
const welcomeTemplate = require("../mail/welcomeTemplate")
const newChildTemplate = require("../mail/newChildTemplate")
const crypto = require("crypto")
let mailOptions = {}

const router = express.Router()

router.post("/api/send", async function(req, res, next) {
  let linkObj = {}
  const link = crypto.randomBytes(20).toString("hex")
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

  switch (req.body.type) {
    case "activate":
      mailOptions = {
        from: `"Pooff" <pooffmoney@gmail.com>`,
        replyTo: "pooffmoney@gmail.com",
        to: req.body.email,
        subject: "Välkommen till Pooff!",
        html: welcomeTemplate(link, () => {})
      }
      linkObj = new Link({
        email: req.body.email,
        link,
        time: Date.now(),
        type: req.body.type
      })
      await linkObj.save(console.log("SAVED"))
      break

    case "reset":
      mailOptions = {
        from: `"Pooff" <pooffmoney@gmail.com>`,
        replyTo: "pooffmoney@gmail.com",
        to: req.body.email,
        subject: "Återställ lösenord",
        html: resetPwTemplate(link, () => {})
      }
      linkObj = new Link({
        email: req.body.email,
        link,
        time: Date.now(),
        type: req.body.type
      })
      await linkObj.save(console.log("SAVED"))
      break
    
      case "child":
        mailOptions = {
          from: `"Pooff" <pooffmoney@gmail.com>`,
          replyTo: "pooffmoney@gmail.com",
          to: req.body.email,
          subject: "Välkommen till Pooff!",
          html: newChildTemplate(link, () => {})
        }
        linkObj = new Link({
          email: req.body.email,
          link,
          time: Date.now(),
          type: req.body.type
        })
        await linkObj.save(console.log("SAVED"))
        break

    default:
      mailOptions = {
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
  res.status(200).send()
})

module.exports = router
