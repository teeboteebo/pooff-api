const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

// DB
const MongoStore = require('connect-mongo')(session)
const settings = require('./config/settings.json')
const connectToDb = require('./config/db')

// Routes
const userRoutes = require('./api/userRoutes')
const qnaRoutes = require('./api/qnaRoutes')
const counterRoute = require('./api/counterRoute')
const loginRoutes = require('./api/loginRoutes')
const transactionRoutes = require('./api/transactionRoutes')
const myTransactionsRoute = require('./api/myTransactionsRoute')
const myUserRoutes = require('./api/myUserRoutes')

// ACL
const aclRules = require('./config/acl-rules.json')
const acl = require('./middleware/acl')
const notificationRoutes = require ('./api/notificationRoutes')
const mailRoutes = require("./api/mailRoutes")

connectToDb()

const app = express()

app.use(bodyParser.json())
app.get("/", (req, res) => res.send("Welcome To Pooff Server"))
global.salt = settings.salt

app.use(
  session({
    secret: settings.cookieSecret,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({
      mongooseConnection: global.db
    })
  })
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
  mailRoutes)


app.listen(5000, () => console.log(`Pooff Server is on port 5000`))
