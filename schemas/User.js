const mongoose = require("mongoose")
const Schema = mongoose.Schema

let userSchema = new Schema({
  username:     { type: String, unique: true },
  role:         { type: String, default: 'pooffer' },
  password:     { type: String },
  firstName:    { type: String },
  lastName:     { type: String },
  email:        { type: String, unique: true },
  phone:        { type: String, unique: true },
  transactions: [
    { type: Schema.Types.ObjectId, ref: 'Transaction' }
  ],
  darkMode:     { type: Boolean, default: false },
  active:       { type: Boolean, default: false }
})

module.exports = mongoose.model("User", userSchema)