const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("please login");
    }
    const isTokenVaild = await jwt.verify(token, "hellothisiskey");
    const user = await User.findOne({ _id: isTokenVaild._id });
    if (!user) {
      throw new Error("user not found");
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(400).send("ERROR: "+ err.message);
  }
};
module.exports = { userAuth };
