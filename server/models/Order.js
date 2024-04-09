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

paymentConfirmation: { type: String }, //'Payment details
shippingDetails: { //shipping object details
  address: { type: String, required: true },
  city: { type: String, required: true },
  
  //add more shipping details as needed (state, postal, etc.)
}

});

module.exports = mongoose.model('Order', orderSchema);
