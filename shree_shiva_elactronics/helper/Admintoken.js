const jwt = require('jsonwebtoken')

// const adminauthGaurd = (req, res, next) => {
//     try {
//         if (!req.headers['token']) {
//             return res.json({ "msg": 'Please come with token' });zzz
//         }
//         let token = req.headers['token'];
//         const result = jwt.verify(token, 'mahadevmahadev');
//         if (result) {
//             // Attach result to req object and call next without arguments
//             req.userData = result;
//             next();
//         } else {
//             return res.json({ "msg": "Token is not valid" });
//         }
//     } catch (err) {
//         return res.status(401).send("Invalid token " + err.message);
//     }
// };


const adminauthGaurd = (req, res, next) => {
    try {
      const bearerHeader = req.headers["authorization"];
      if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        try {
          const data = jwt.verify(req.token,process.env.JWT2);
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
  
module.exports = adminauthGaurd




