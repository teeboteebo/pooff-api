const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionAndAnswer = new Schema({
  question: { type: String },
  answer: { type: String },
  counter: { type: Number, default: 0 },
  addedAtDate: { type: Date, default: new Date().getTime() }
})

module.exports = mongoose.model('Qna', questionAndAnswer)
