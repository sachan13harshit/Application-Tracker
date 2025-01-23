const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required : true,
    },
    email: {
      type: String,
      required : true,
      unique : true,
    },
    password: {
      type: String,
      required : true,
      select : false,
    },
    notes: [],
    role: {
      type: String,
      default: "normal",
    },
  },
);

 const User = mongoose.model("User", userSchema);
 module.exports = { User };