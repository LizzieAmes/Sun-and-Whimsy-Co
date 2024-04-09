const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Admin, Product, Order } = require('../models');
require('dotenv').config();

require('dotenv').config();

const resolvers = {
  Query: {
    products: async () => await Product.find({}),
    orders: async () => await Order.find({}).populate('products.product'),
    // Add more queries as needed
  },
  Mutation: {
    // Admin signup
    signup: async (_, { name, email, password }) => {
      //const hashedPassword = await bcrypt.hash(password, 10);
      //const admin = new Admin({ name, email, password: hashedPassword });
      //await admin.save();
      const admin = await Admin.create({ name, email, password });
      console.log(admin);
      // const token = jwt.sign(
      //   {  data:{name:admin.name, email:admin.email, admin:admin._id}},

      //     process.env.JWT_SECRET
      // ); // Use an environment variable for the secret key

      const token = jwt.sign(
        {
          data: {
            name: admin.name,
            email: admin.email,
            _id: admin._id,
          },
        },
        process.env.JWT_SECRET
      );

      console.log(token);
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
      try {
        const deletedProduct = await Product.findOneAndDelete({ _id: id });
        if (!deletedProduct) {
          throw new Error('Product not found or already deleted');
        }
        return deletedProduct; // Return the deleted document
      } catch (error) {
        throw new Error(error.message);
      }
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

module.exports = resolvers;
