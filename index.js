const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const settings = require('./config/settings.json')
const connectToDb = require('./config/db')
const userRoutes = require('./api/userRoutes')
const qnaRoutes = require('./api/qnaRoutes')
const counterRoute = require('./api/counterRoute')
const loginRoutes = require('./api/loginRoutes')
const aclRules = require('./config/acl-rules.json')
const acl = require('./middleware/acl')

connectToDb()

const app = express()

app.use(bodyParser.json())
app.get('/', (req, res) => res.send('Welcome To Pooff Server'))
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

app.use(userRoutes, loginRoutes, qnaRoutes, counterRoute)

// let all user roles have access get mytransactions
// because the "acl" in this case take place inside the route
// by only looking up transactions belonging to the logged in user
app.get('/api/mytransactions',  async (req, res) => {
  let user = req.session.user;
  if(!user){ res.json([]); return; }
  // lookup transactions involving me in the db
  // given that amount in a transactions is always a positive number
  // then reverse the number to negative for everyhing i sent
  let iGot = await Transaction.find({receiver: user._id});
  let iSent = await Transaction.find({sender: user._id}).map(x => ({...x, amount: -x.amount}));
  let allMyTransactions = iGot.concat(iSent);
  allMyTransactions.sort((a,b) => a.date < b.date ? -1 : 1);
  res.json(allMyTransactions);
})


app.listen(5000, () => console.log(`Pooff Server is on port 5000`))
