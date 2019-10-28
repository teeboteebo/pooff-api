const mongoose = require("mongoose")
const Schema = mongoose.Schema

let NotificationSchema = new Schema({
  receiver: {  type: Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  message:   { type: String },
  type: { type: String},
})

module.exports = mongoose.model("Notification", NotificationSchema)
