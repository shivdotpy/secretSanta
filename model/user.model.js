const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  { 
    email: { type: String, lowercase: true, unique: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("user", userModel);
