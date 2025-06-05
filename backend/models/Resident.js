const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    default: 'https://via.placeholder.com/150',
  },
  linkedinUrl: {
    type: String,
  },
  twitterUrl: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Resident', residentSchema); 