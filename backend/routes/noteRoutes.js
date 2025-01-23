const express = require("express");
const router = express.Router();
const { addNote, deleteNote, getNotes } = require("../controller/notes");
const { isAuthenticated } = require("../middleware/authenticate");

router.post("/add", isAuthenticated, addNote);
router.delete("/delete", isAuthenticated, deleteNote);
router.get("/get", isAuthenticated, getNotes);

module.exports = router;