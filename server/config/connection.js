// server/config/config.js

module.exports = {
    mongoURI: process.env.MONGO_URI || 'your_mongodb_uri',
    port: process.env.PORT || 4000,
  };
  