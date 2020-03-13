const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  registrationName: {
    type: String,
    trim: true,
  },
  contactName: {
    type: String,
    trim: true,
  },
  pin: {
    type: Number,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    trim: true,
  },
  transactions: {
    type: Number,
    trim: true,
  },
});

module.exports = mongoose.model('Registration', registrationSchema);