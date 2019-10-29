const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const settings = require("./config/settings.json")
const connectToDb = require("./config/db")
const userRoutes = require("./api/userRoutes")
const qnaRoutes = require("./api/qnaRoutes")
const loginRoutes = require("./api/loginRoutes")
const mailRoutes = require("./API/mailRoutes")

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

app.use(userRoutes, loginRoutes, mailRoutes)

app.listen(5000, () => console.log(`Pooff Server is on port 5000`))
