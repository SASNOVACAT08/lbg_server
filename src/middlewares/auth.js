const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.send({ type: "error", msg: "No Token" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.send({ type: "error", msg: "Wrong Token" });
    }
    req.user = user;
    next();
  });
};

const isAuthSock = (socket, data, cb) => {
  console.log(socket);
  next();
};

module.exports = { isAuth, isAuthSock };
