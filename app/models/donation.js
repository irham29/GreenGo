const mongoose = require('mongoose');
const Donation = mongoose.model('Donation', {
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  condition: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Selesai', 'Berlansung', 'Pending'],
    default: 'Pending'
  },
  is_accept: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  user: {
    type: String,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Donation;
