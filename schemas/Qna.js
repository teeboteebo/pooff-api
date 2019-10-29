const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionAndAnswer = new Schema({
  question: { type: String },
  answer: { type: String },
  counter: { type: Number, default: 0 },
  createdAtDate: { type: Number }
})

module.exports = mongoose.model('Qna', questionAndAnswer)
