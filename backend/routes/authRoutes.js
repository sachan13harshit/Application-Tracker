const express = require("express");

const router = express.Router();

const {
  login,
  register,
  logout,
  getMyDetails,
} = require("../controller/auth");
const { isAuthenticated } = require("../middleware/authenticate");

router.post("/login", login);
router.post("/register", register);
router.get("/me", isAuthenticated, getMyDetails);
router.post("/logout", isAuthenticated, logout);


module.exports = router;