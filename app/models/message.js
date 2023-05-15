const mongoose = require('mongoose');
const Message = mongoose.model('Messsage', {
  sender: {
    type: String,
    ref: 'User',
    required: true
  },
  recipient: {
    type: String,
    ref: 'User',
    required: true
  },
  donation: {
    type: String,
    ref: 'Donation',
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Message;
