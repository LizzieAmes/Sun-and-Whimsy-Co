const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Product, Order } = require('../models');

const resolvers = {
  Query: {
    products: async () => await Product.find({}),
    orders: async () => await Order.find({}).populate('products.product'),
    // Add more queries as needed
  },
  Mutation: {
    // User signup
    signup: async (_, { name, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();

      const token = jwt.sign({ userId: user.id }, 'YOUR_SECRET_KEY'); // Use an environment variable for the secret key

      return { token, user };
    },
    // User login
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('No such user found');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ userId: user.id }, 'YOUR_SECRET_KEY');

      return { token, user };
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
