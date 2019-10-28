const mongoose = require("mongoose")
const Schema = mongoose.Schema

let transactionSchema = new Schema({
    date: { type: Date, default: Date.now },
    message: { type: String },
    sender: {  type: Schema.Types.ObjectId, ref: 'User' },
    receiver: {  type: Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number },
})

module.exports = mongoose.model("Transaction", transactionSchema)
