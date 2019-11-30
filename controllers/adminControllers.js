// imports
const { generateToken } = require("../helpers/jwt");

// models-import
const { validateUser, User } = require("../models/user");


// exports

// POST - CONTROLLERS----------------------------------------------------------------------------

exports.adminLogin = async (req, res) => {
  try {
    const user = req.body;
    // generate new token
    const token = generateToken(user);

    // updating last login field
    req.body.lastLogin = Date.now();
    await User.findByIdAndUpdate(req.id, req.body, {
      new: true
    });
    res.status(200).json({
      token,
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email
      }
    });
  } catch (e) {
    res.status(500).json({ message: "Internal Server error." });
    console.log("ERROR-WHILE-LOGIN-ADMIN: ", e.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
    const { name, email, password, requestFrom } = req.body;

    // check if request is coming from admin
    if (requestFrom.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Not authorized for this request" });
    }
    // for joi validation of actual body sent for th creation request
    const role = "user";
    const actualBody = { role, name, email, password };

    const { error } = validateUser(actualBody);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // checking for existing email
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "Email is already registered" });
    }
    const newUser = new User({
      role,
      name,
      email,
      password
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json({ message: "Internal Server error." });
    console.log("ERROR-WHILE-CREATING-USER: ", e);
  }
};


// GET - CONTROLLERS-----------------------------------------------------------------------------

// PLURAL----------------------------------------------------------
exports.getAllUser = async (req, res) => {
  try {
    // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
    const { requestFrom } = req.body;

    // check if request is coming from admin
    if (requestFrom.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Not authorized for this request" });
    }

    let users = await User.find();
    // filtering users from users & admins
    users = users.filter(user => user.role === "user");
    res.send(users);
  } catch (e) {
    res.status(500).json({ message: "Internal Server error." });
    console.log("ERROR-WHILE-GETTING-ALL-USERS: ", e);
  }
};

// SINGULAR -------------------------------------------------------

exports.getUserById = async (req, res) => {
  try {
    // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
    const { requestFrom } = req.body;

    // check if request is coming from admin
    if (requestFrom.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Not authorized for this request" });
    }

    const id = req.params.id;

    const user = await User.findById(id);
    res.send(user);
  } catch (e) {
    res.status(500).json({ message: "Internal Server error." });
    console.log("ERROR-WHILE-GETTING-USER-BY-ID: ", e);
  }
};


// PUT - CONTROLLERS-----------------------------------------------------------------------------


// DELETE - CONTROLLERS--------------------------------------------------------------------------
