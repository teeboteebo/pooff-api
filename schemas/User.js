const mongoose = require("mongoose")
const Schema = mongoose.Schema

let userSchema = new Schema({
  username:     { type: String, unique: true, required: true },
  role:         { type: String, default: 'user' },
  password:     { type: String, required: true },
  firstName:    { type: String, required: true },
  lastName:     { type: String, required: true },
  email:        { type: String, unique: true, required: true },
  phone:        { type: String, unique: true, required: true },
  active:       { type: Boolean, default: false },
  darkMode:     { type: Boolean, default: false },
  transactions: [
    {type: Schema.Types.ObjectId, ref: 'Transaction'}
  ],
  children:     [
    {type: Schema.Types.ObjectId, ref: 'User'}
  ]
})

module.exports = mongoose.model("User", userSchema)