const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
  level: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);