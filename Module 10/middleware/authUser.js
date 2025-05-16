const jwt = require("jsonwebtoken");

// STEP 5 - Implement JWT Middleware For Token Verification. The General Steps are:
//  Read the authorization request header, check if the token exists, check authorization type and read the token
//  if exists: Use jwt to verify the token using the same private key you used in the login endpoint
//             Store the decrypted JSON token in the req.user property
//             Pass the request to the next handler using next();
//             if there's a verification error, return status 400 "Invalid Token"
//  if not: return status 401 "Access Denied"

module.exports = (req, res, next) => {
// Your code here
  let token = req.header("x-authtoken");
    if (token) { 
      try {
        req.jwtPayLoad = jwt.verify(token, "12345678");
        next();
      } catch {
        res.status(401).send("Access denied. Invalid token.");
      }

    } else {
      res.status(401).send("Access denied. No token provided.");
    }
};