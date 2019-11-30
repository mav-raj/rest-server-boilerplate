// imports
const express = require("express");
const router = express.Router();

// middlewares
const _verifyToken = require("../middlewares/verifyToken").verifyUserToken;
const _validateUser = require("../middlewares/validateUser").validateUser;

// controllers
const userControllers = require("../controllers/userControllers");

// POST - methods
router // login-user
  .route("/login")
  .post(_validateUser, userControllers.userLogin);


// exports
module.exports = router;
