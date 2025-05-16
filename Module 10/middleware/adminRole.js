// STEP 7 - Implement Role Verification. The General Steps are:
//  Check to see if the req.user property exists
//  if exists: compare the req.user.role to "admin"
//             if admin: Pass the request to the next handler using next();
//             
//             if not: return status 401 "Unauthorized Access"
//  if not: return status 401 "User is not authenticated"

module.exports = (req, res, next) => {
    // Your code here
    if (req.jwtPayLoad) { // Checking to see if user is authenticated
      if (req.jwtPayLoad.role === "admin") {
        next();
      } else {
        res.status(401).send("Not admin. Unauthorized access.");
      }
    } else {
      res.status(401).send("User is not authenticated");
    }
  };