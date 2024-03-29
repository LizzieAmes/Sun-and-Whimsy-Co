// Import models
const User = require('./Admin');
const Product = require('./Product');
const Order = require('./Order');

// Export models
module.exports = {
  User,
  Product,
  Order
};
const { User, Product, Order } = require('../models'); // Adjust the path as necessary
