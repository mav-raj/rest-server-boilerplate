// imports
const jwt = require("jsonwebtoken");

// constants
const JWT_SECRET = require("../assets/constants").JWT_SECRET;

// exports
exports.generateToken = user => {
  // using synchronous jwt method
  return jwt.sign(user, JWT_SECRET); // return a token based on user object
};
exports.verifyToken = token => {
  // using synchronous jwt method
  return jwt.verify(token, JWT_SECRET); // returns user object if valid token, else throw an (error keep it in try-catch)
};
