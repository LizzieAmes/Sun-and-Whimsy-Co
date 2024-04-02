const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
  // Include payment confirmation, shipping details, etc.

paymentConfirmation: 'Payment recceived. Transaction ID: 34565174',
shippingDetails: {
  address: '752 Main St',
  city: 'Salt Lake City',
  //add more details?
}

});

module.exports = mongoose.model('Order', orderSchema);

