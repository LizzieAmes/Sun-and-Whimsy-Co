const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Admin, Product, Order } = require('../models');

const resolvers = {
  Query: {
    products: async () => await Product.find({}),
    orders: async () => await Order.find({}).populate('products.product'),
    // Add more queries as needed
  },
  Mutation: {
    // Admin signup
    signup: async (_, { name, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = new Admin({ name, email, password: hashedPassword });
      await admin.save();

      const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET); // Use an environment variable for the secret key

      return { token, admin };
    },
    // Admin login
    login: async (_, { email, password }) => {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        throw new Error('No such admin found');
      }

      const valid = await bcrypt.compare(password, admin.password);
      if (!valid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET);

      return { token, admin };
    },
    // Add product
    addProduct: async (
      _,
      { name, description, price, categories, stock, imageUrl }
    ) => {
      const product = new Product({
        name,
        description,
        price,
        categories,
        stock,
        imageUrl,
      });
      await product.save();
      return product;
    },
    // Update product
    updateProduct: async (
      _,
      { id, name, description, price, categories, stock, imageUrl }
    ) => {
      const product = await Product.findByIdAndUpdate(
        id,
        { name, description, price, categories, stock, imageUrl },
        { new: true }
      );
      return product;
    },
    // Delete product
    deleteProduct: async (_, { id }) => {
      const product = await Product.findByIdAndRemove(id);
      return product ? true : false;
    },
    // Create order
    createOrder: async (_, { products }) => {
      const order = new Order({ products });
      await order.save();
      return order;
    },
    // Add more mutations as needed
  },
};

module.exports = { resolvers };
