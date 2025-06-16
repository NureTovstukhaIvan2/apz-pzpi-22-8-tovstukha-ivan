const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Доступ тільки для адмінів
  app.get(
    "/api/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAll
  );

  app.post(
    "/api/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.create
  );

  app.get(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isAdminOrManager],
    controller.findOne
  );

  app.put(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );

  app.delete(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );

  app.get(
    "/api/users/:userId/aquariums",
    [authJwt.verifyToken],
    controller.getUserAquariums
  );
};
