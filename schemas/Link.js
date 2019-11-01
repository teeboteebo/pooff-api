const mongoose = require("mongoose")
const Schema = mongoose.Schema

let linkSchema = new Schema({
  email: { type: String },
  link: { type: String },
  time: { type: Number },
  type: { type: String }
})

module.exports = mongoose.model("Link", linkSchema)
