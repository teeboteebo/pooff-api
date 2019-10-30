const express = require("express")
const nodemailer = require("nodemailer")
const { mail } = require("../config/config")
const uuidv4 = require("uuid/v4")
let mailOptions = {}

const router = express.Router()

router.post("/api/send", function(req, res, next) {
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

  if (req.body.subject === "Välkommen till Pooff!")
    mailOptions = {
      from: `"Pooff" <pooffmoney@gmail.com>`,
      replyTo: "pooffmoney@gmail.com",
      to: req.body.email,
      subject: req.body.subject,
      html: `<div style="padding: 30px 50px 50px; text-align: center; background: #fff; max-width: 600px; margin: 0 auto 15px; box-shadow: 0 0 5px 0px rgba(0,0,0,0.4)">
      <a href=${"http://localhost:5000/api/users/activate/" +
        link} style="word-wrap: none; text-decoration: none; font-size: 16px; font-weight: bold; background: #6C80C5; color: #fff; padding: 15px 30px; border-radius: 100px; opacity: 0.8; margin-top: 40px;">Aktivera konto</a></div>`
    }
  else if (req.body.subject === "Återställ lösenord")
    mailOptions = {
      from: `"Pooff" <pooffmoney@gmail.com>`,
      replyTo: "pooffmoney@gmail.com",
      to: req.body.email,
      subject: req.body.subject,
      html: `<div style="padding: 30px 50px 50px; text-align: center; background: #fff; max-width: 600px; margin: 0 auto 15px; box-shadow: 0 0 5px 0px rgba(0,0,0,0.4)">
      <a href=${"http://localhost:5000/api/users/resetpassword/" +
        link} style="word-wrap: none; text-decoration: none; font-size: 16px; font-weight: bold; background: #6C80C5; color: #fff; padding: 15px 30px; border-radius: 100px; opacity: 0.8; margin-top: 40px;">Klicka här för att återställa lösenord</a></div>`
    }
  else {
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
