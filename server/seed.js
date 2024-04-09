const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('./config/connection'); 


const adminData = {
  name: 'Admin Name',
  email: 'admin@example.com',
  password: 'adminpassword', 
};

async function seedDatabase() {
  try {
  await Admin.deleteMany({}); 
    const admin = new Admin(adminData);
    await admin.save();

    console.log('Admin seeded successfully');

    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding data: ', err);
    mongoose.disconnect();
  }
}

seedDatabase();
