const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { isAuthenticated } = require("../middleware/authenticate");
const {
  addResume,
  displayResume,
  getResume,
  deleteResume,
} = require("../controller/resume");

router.post("/add", upload.single("file"), isAuthenticated, addResume);
router.get("/get", isAuthenticated, displayResume);
router.get("/getId", isAuthenticated, getResume);
router.delete("/del", isAuthenticated, deleteResume);
module.exports = router;