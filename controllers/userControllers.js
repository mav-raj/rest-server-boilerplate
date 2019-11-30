// imports
const { User } = require("../models/user");
const { generateToken } = require("../helpers/jwt");

exports.userLogin = async (req, res) => {
  try {
    const user = req.body;
    // generate new token
    const token = generateToken(user);

    // updating last login field
    req.body.lastLogin = Date.now();
    await User.findByIdAndUpdate(req.id, req.body, { new: true });

    res.status(200).json({
      token,
      user: {
        role: user.role,
        name: user.name,
        email: user.email
      }
    });
  } catch (e) {
    res.status(500).json({ message: "Internal Server error." });
    console.log("ERROR-WHILE-LOGIN-USER: ", e.message);
  }
};
