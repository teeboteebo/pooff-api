const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const path = require('path')

// DB
const MongoStore = require("connect-mongo")(session)
const settings = require("./config/settings.json")
const connectToDb = require("./config/db")

// Routes
const userRoutes = require("./api/userRoutes")
const qnaRoutes = require("./api/qnaRoutes")
const counterRoute = require("./api/counterRoute")
const loginRoutes = require("./api/loginRoutes")
const transactionRoutes = require("./api/transactionRoutes")
const myTransactionsRoute = require("./api/myTransactionsRoute")
const myUserRoutes = require("./api/myUserRoutes")
const linkRoutes = require("./api/linkRoutes")

// ACL
const aclRules = require("./config/acl-rules.json")
const acl = require("./middleware/acl")
const notificationRoutes = require("./api/notificationRoutes")
const mailRoutes = require("./api/mailRoutes")

//Cron
const cron = require("node-cron")
const Link = require("./schemas/Link")

connectToDb()

const app = express()

app.use(bodyParser.json())

global.salt = settings.salt

app.use(
  session({
    secret: settings.cookieSecret,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({
      mongooseConnection: global.db,
    }),
  }),
)

app.use(acl(aclRules))

app.use(
  userRoutes,
  loginRoutes,
  qnaRoutes,
  counterRoute,
  transactionRoutes,
  myTransactionsRoute,
  myUserRoutes,
  notificationRoutes,
  mailRoutes,
  linkRoutes,
)

cron.schedule("* * * * *", async function() {
  let allLinks = await Link.find()
  allLinks.map(link => {
    if (Date.now() - 900000 > link.time) {
      link.delete()
      console.log("deleted", link)
    }
  })
})

app.listen(5000, () => console.log(`Pooff Server is on port 5000`))



// if on server serve static build files
if(__dirname === '/var/www/pooff-api'){
  app.use(express.static(path.resolve(__dirname, '../pooff/build')))
  app.get('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../pooff/build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
  console.log("I am the server. I serve a static build!")
}
