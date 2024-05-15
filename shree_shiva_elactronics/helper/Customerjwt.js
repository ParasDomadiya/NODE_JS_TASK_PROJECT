const jwt = require('jsonwebtoken')




//ADMIN ACCESS VERIFICATION
const customerAccess = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      try {
        const data = jwt.verify(req.token, process.env.JWT1);
        return next();
      } catch {
        return res.status(401).json({
          status: 401,
          message: "Token IS Invalid ! Please Login Again",
        });
      }
    } else {
      res.status(401).json({ Status: 401, Message: "Not Authorized!" });
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {customerAccess}