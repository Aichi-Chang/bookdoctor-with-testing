const mongoose = require('mongoose')

const Schema = mongoose.Schema

const medicinesSchema = new Schema({
  type: { type: String },
  name: { type: String },
  articleStatus: { type: String },
  linkRelationship: { type: String },
  url: { type: String },
  description: { type: String },
  mainEntityOfPage: {
    genre: { type: String },
    lastReviewed: [{
      type: String
    }],
    dateModified: { type: String },
    type: { type: String }
  }
})


module.exports = mongoose.model('Medicines', medicinesSchema)
