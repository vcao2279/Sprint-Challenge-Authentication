const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');
const jwt = require('jsonwebtoken');
const jwtKey = require('../_secrets/keys').jwtKey;

const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function sendError(code, message, error) {
  return {
    code,
    message,
    error
  }
}

function generateToken(user) {
  const payload = {
    username: user.username
  }

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, jwtKey, options);
}

async function register(req, res, next) {
  // implement user registration
  if (!(req.body.username && req.body.password)) {
    return next(sendError(400, 'Failed to register.', 'Username or password is missing.'));
  }

  const user=req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  try {
    const response = await db('users').insert(user);
    const token = generateToken(user);
    res.status(200).send(token);
  } catch (error) {
    return next(sendError(500, 'Failed to register,', error.message));
  }

}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
