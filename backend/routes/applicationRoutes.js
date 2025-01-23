const express = require("express");
const router = express.Router();
const {
  addApplication,
  deleteApplication,
  updateStatus,
  getApplication,
} = require("../controller/application");
const { isAuthenticated } = require("../middleware/authenticate");

router.post("/add", isAuthenticated, addApplication);
router.delete("/rem", isAuthenticated, deleteApplication);
router.patch("/update", isAuthenticated, updateStatus);
router.get("/get", isAuthenticated, getApplication);
module.exports = router;