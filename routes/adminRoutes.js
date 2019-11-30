// imports
const express = require("express");
const router = express.Router();

// middlewares
const _verifyToken = require("../middlewares/verifyToken").verifyUserToken;
const _verifyUser = require("../middlewares/validateUser").validateUser;

// controllers
const adminControllers = require("../controllers/adminControllers");

// admin-routes

// POST - methods
router // login-admin
  .route("/login")
  .post(_verifyUser, adminControllers.adminLogin);

router // create-user
  .route("/user")
  .post(_verifyToken, adminControllers.createUser);


// GET - methods

// PLURAL
router // get-all-users
  .route("/user")
  .get(_verifyToken, adminControllers.getAllUser);


// SINGULAR
router // get-user-by-ID
  .route("/user/:id")
  .get(_verifyToken, adminControllers.getUserById);


// exports
module.exports = router;
