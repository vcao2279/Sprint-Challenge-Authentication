const express = require('express');
const cors = require('cors');

const configureRoutes = require('./config/routes');

const server = express();
const corsOptions = {
  origin: 'http://localhost:3000/'
};

server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));

configureRoutes(server);

server.use((error, req, res, next) => {
  res.status(error.code).json({message: error.message, error: error.error})
})

module.exports = {
  server,
};
