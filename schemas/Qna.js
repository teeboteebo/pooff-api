const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionAndAnswer = new Schema({
  question: { type: String, unique: true },
  answer: { type: String, unique: true },
  counter: { type: Number },
  addedAtDate: { type: Date, required: true, default: Date.now }
})

module.exports = mongoose.model('Qna', questionAndAnswer)
