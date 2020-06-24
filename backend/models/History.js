const mongoose = require('mongoose')


const Schema = mongoose.Schema


const historySchema = new Schema({
  date: { type: String, required: true },
  content: { type: String, required: true },
  prescription: { type: String },
  patient: { type: String, require: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})




module.exports = mongoose.model('History', historySchema)
