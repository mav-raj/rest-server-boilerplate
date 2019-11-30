// imports
require("dotenv").config();
const config = require('config');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// router import
const adminRouter = require('./routes/adminRoutes');
const userRouter = require("./routes/userRoutes");

// user import for admin creation
const { User } = require("./models/user");

// constants for connection
const PORT = process.env.PORT || 4000;
const MONGODB_CONNECTION_STRING = config.get("db.connection-string");

const app = express();

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/admin', adminRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => res.send('<center><h1>Server running</h1></center>'))

// database connection
mongoose
  .connect(MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(async res => {
    let admin;
    admin = await User.findOne({ role: "admin" });
    if (!admin) {
      let adminUser = {
        role: "admin",
        name: "admin",
        email: "admin@admin.com",
        password: "admin",
      };
      User.create(adminUser);
    }
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log("Server running on port: ", PORT);
    });
  })
  .catch(error => console.error(error));
