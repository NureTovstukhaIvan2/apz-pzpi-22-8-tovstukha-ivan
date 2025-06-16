const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Токен не надано!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Не авторизовано!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (user.role === "ADMIN") {
      next();
      return;
    }

    res.status(403).send({
      message: "Потрібна роль адміністратора!",
    });
  });
};

isManager = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (user.role === "MANAGER") {
      next();
      return;
    }

    res.status(403).send({
      message: "Потрібна роль менеджера!",
    });
  });
};

isAdminOrManager = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (user.role === "ADMIN" || user.role === "MANAGER") {
      next();
      return;
    }

    res.status(403).send({
      message: "Потрібна роль адміністратора або менеджера!",
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isManager: isManager,
  isAdminOrManager: isAdminOrManager,
};
module.exports = authJwt;
