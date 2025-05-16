const mongoose = require("mongoose");

// STEP 2 - DEFINE THE SCHEMA

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    maxlength: 35
  },
  username: {
    type: String, 
    required: true,
    maxlength: 30,
    unique: true
  },
  email: {
    type: String,
    required: true,
    index: { // index only gets created for a new collection
      unique: true,
      collation: { locale: "en", strength: 2 }
    },
    // be a valid email
    match: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/ //regular express
  },
  password: {
    type: String, 
    required: true,
    maxlength:100
  }
});

// STEP 3 - CREATE THE MODEL

module.exports = mongoose.model("User", userSchema);
