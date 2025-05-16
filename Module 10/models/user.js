const mongoose = require("mongoose");

// STEP 2 - Add the password and role fields
// password: type of String, required and minimum length of 6
// role: type of String, required, default of "user" and enum: ["user", "admin"]

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,
    index: {
      unique: true,
      collation: { locale: 'en', strength: 2 }
    }
  },
  password:{type:String, required: true, minlength:6},
  role:{type:String, required:true, enum:["user","admin"],default:"user"}
});

const User = mongoose.model("User", userSchema);

module.exports = User;