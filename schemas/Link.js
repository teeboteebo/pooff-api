const mongoose = require("mongoose")
const Schema = mongoose.Schema

let linkSchema = new Schema({
  email: { type: String },
  link: { type: String },
  time: { type: Number }
})

module.exports = mongoose.model("Link", linkSchema)
