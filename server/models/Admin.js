const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: String,
  paymentDetails: {
    cardNumber: String,
    expiryDate: Date,
    CVV: Number,
  }
  // Include more fields as necessary
});

module.exports = mongoose.model('User', userSchema);
