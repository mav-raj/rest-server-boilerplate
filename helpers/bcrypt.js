// imports
const bcrypt = require('bcrypt');

// constants
const salt = require('../assets/constants').BCRYPT_SALT;

const createHash = async password => bcrypt.hash(password, salt);
const compareHash = async (password, hash) => bcrypt.compare(password, hash);

// exports
module.exports = { createHash, compareHash };