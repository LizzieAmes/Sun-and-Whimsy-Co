server/index.js

require('dotenv').config({ path: './.env' }); 
const startServer = require('./server');

startServer();
