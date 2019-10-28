const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionAndAnswer = new Schema({
  question: { type: String },
  answer: { type: String },
  counter: { type: Number },
  addedAtDate: { type: Date, default: new Date().getTime() }
})

module.exports = mongoose.model('Qna', questionAndAnswer)
