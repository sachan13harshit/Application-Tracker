const express = require("express");

const router = express.Router();

const {
  login,
  register,
  logout,
  Verify,
} = require("../controller/auth");
const { isAuthenticated } = require("../middleware/authenticate");

router.post("/login", login);
router.post("/register", register);
router.get("/verify", isAuthenticated, Verify);
router.post("/logout", isAuthenticated, logout);


module.exports = router;