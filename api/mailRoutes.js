const express = require("express")
const nodemailer = require("nodemailer")
const { mail } = require("../config/config")
let mailOptions = {}

const router = express.Router()

router.post("/api/send", function(req, res, next) {
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

  if (req.body.subject === "Välkommen till Pooff!")
    mailOptions = {
      from: `"Pooff" <pooffmoney@gmail.com>`,
      replyTo: "tojjinfo@gmail.com",
      to: req.body.email,
      subject: req.body.subject,
      html: `<div style="padding: 30px 50px 50px; text-align: center; background: #fff; max-width: 600px; margin: 0 auto 15px; box-shadow: 0 0 5px 0px rgba(0,0,0,0.4)">
      <a href=${"http://localhost:5000/api/users/confirm/" +
        req.body
          .id} style="word-wrap: none; text-decoration: none; font-size: 16px; font-weight: bold; background: #6C80C5; color: #fff; padding: 15px 30px; border-radius: 100px; opacity: 0.8; margin-top: 40px;">Aktivera konto</a></div>`
    }
  else {
    mailOptions = {
      from: `"Pooff" <pooffmoney@gmail.com>`,
      replyTo: "tojjinfo@gmail.com",
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
})

module.exports = router
