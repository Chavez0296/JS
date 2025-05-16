const express = require("express");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authUser = require("../middleware/authUser.js");
const adminRole = require("../middleware/adminRole.js");
// require bcrypt
// require jsonwebtoken
// require ../middleware/authUser.js
// require ../middleware/adminRole.js

const router = new express.Router();

//STEP 3 - Implement the user registration endpoint. The general steps should be:

// Query MongoDB to see if the user exists or not
//   if not: Create a new User() based on the body of the request.
//           Validate the new user against the schema.
//             if valid, hash the new user's password using bcrypt
//             save the new user model into MongoDB and return the result

// TEST YOUR ENDPOINT USING REQBIN BEFORE PROCEEDING

router.post("/register", (req, res) => {
// Your code here
User.findOne({ email: req.body.email }, (err, result) => {
    if (!err) {
      if (!result) {
        let newUser = new User(req.body);
        let valErr = newUser.validateSync();

        if (!valErr) {
          newUser.password = bcrypt.hashSync(newUser.password, 10);

          newUser.save((err, result) => {
            if (!err) {
              res.status(201).send(result);
            } else {
              res.status(400).send(err.message);
            }
          })
        } else {
          res.status(400).send(valErr.message);
        }
      } else {
        res.status(400).send("User already exists.");
      }
    } else {
      res.status(400).send(err.message);
    }
  });
});


//STEP 4 - Implement the login endpoint. The general steps should be:

// Query MongoDB to see if the user exists or not
//   if exists: Compare the user's stored password hash with the password passed in using bcrypt.compare()
//              if match, Create a payLoad object with the _id and role fields based on the MongoDB document.
//                        Sign the payLoad into a token using a private key (anything you like)
//                        Send a new JSON object in the response that contains:
//                        { _id, name, email, role and jwt } where jwt is the signed token

// TEST YOUR ENDPOINT USING REQBIN BEFORE PROCEEDING

router.post("/login", (req, res) => {
// Your code here
User.findOne({ email: req.body.email }, (err, result) => {
    if (!err) {
      if (result) {
      
        bcrypt.compare(req.body.password, result.password, (err, bcresult) => {
          if (bcresult) { 
            let payLoad = {
              _id: result._id,
              role: result.role
            };

            let token = jwt.sign(payLoad, "12345678");

            res.status(200).send({
              _id: result._id,
              name: result.name,
              email: result.email,
              role: result.role,
              jwt: token
            });

          } else {
            res.status(400).send("Invalid email/password.");
          }
        })
      } else {
        res.status(400).send("User does not exist.");
      }
    } else {
      res.status(400).send(err.message);
    }
  });  
});


//STEP 6 - Apply the authUser middleware it to this endpoint. Test using Reqbin

router.get("/secure", authUser, (req, res) => {
  res.status(200).send("Successfully Accessed Secure Endpoint!");
});

//STEP 8 - Apply the authUser AND adminRole middleware it to this endpoint. Test using Reqbin
router.get("/secureadmin", authUser, adminRole, (req, res) => {
  res.status(200).send("Successfully Accessed Secure Admin Endpoint!");
});

module.exports = router;