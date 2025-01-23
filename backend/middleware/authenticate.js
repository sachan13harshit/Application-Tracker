const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decodedData._id);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

module.exports = { isAuthenticated };