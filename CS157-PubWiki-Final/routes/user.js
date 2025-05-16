const express = require("express");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authUser = require("../middleware/authUser.js");


const router = express.Router();


// User Registration (/api/user/register)
router.post("/register", (req, res) => {
  // Check to see if the account exists
  console.log("in register:" + req.body.email);
  User.findOne({ email: req.body.email }, (err, result) => {
    if (!err) {
      if (!result) { // if result is undefined then that email does not exist

        // Create the new user object
        let newUser = new User(req.body);

        // Hash the user password, salt it and store it
        newUser.password = bcrypt.hashSync(newUser.password, 10);

        // Save the user account
        newUser.save((err, result) => {
          if (!err) {
            res.status(201).send(result);
          } else {
            res.status(400).send(err);
          }
        });
      } else {
        res.status(400).send("User already exists");
      }
    } else {
      console.log("in register " + err.message);
      res.status(400).send(err);
    }
  })
});

// Login Handler (/api/user/login)

router.post("/login", (req, res) => {

  // Look for the user in the collection
  User.findOne({ email: req.body.email }, (err, result) => {
    if (!err) {
      if (result) {
        // Step 1 is compare the user's password to the hash

        bcrypt.compare(req.body.password, result.password, (err, bcresult) => {
          if (bcresult) { // if bcresult is defined, the password was a match
            // at this point the username/password are valid

            // Step 2: Create and issue the JWT

            let payLoad = {
              _id: result._id 
            };

            // Create the token (sign it)

            let token = jwt.sign(payLoad, "12345678");

            // Send the token to the client
            res.status(200).send({
              jwt: token,
              fullName: result.fullName,
              userId: result._id
            });

          } else {
            res.status(400).send("Invalid email/password");
          }
        });

      } else {
        res.status(400).send("Invalid email/password");
      }
    } else {
      res.status(400).send("Invalid email/password");
    }
  });

});

//api/user/:id  retrieve info about user
router.get("/:id", (req, res) => {
  console.log("get info for user id=" + req.params.id);
  User.findOne({ _id: req.params.id }, (err, result) => {
    if (!err) {
      res.status(200).send(result);
    } else {
      res.status(400).send(err);
    }
  })
});

module.exports = router;