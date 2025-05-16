const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Read the Authorization header
  // Authorization: <type> <token>

  const authHeader = req.header("authorization");
  //"Bearer <jwt>"
  if (authHeader) {
    try {
      const authArray = authHeader.split(" ");
      if (authArray[0].toLowerCase() == "bearer") {
        const token = authArray[1];
        const payLoad = jwt.verify(token, "12345678");
        req.user = payLoad;
        next();
      } else {
        res.status(401).send("Access denied: Authorization type not supported");
      }
    } catch {
      res.status(401).send("Access denied: Invalid token");
    }
  } else {
    res.status(401).send("Access denied: No authorization token provided");
  }
};