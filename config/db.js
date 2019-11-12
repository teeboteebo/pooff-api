const mongoose = require('mongoose')
const connectionString = require('./connectionString.js')

const connectToDb = () => {
  // connect to db for testing
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  mongoose
    .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))

  global.db = mongoose.connection
}

module.exports = connectToDb
