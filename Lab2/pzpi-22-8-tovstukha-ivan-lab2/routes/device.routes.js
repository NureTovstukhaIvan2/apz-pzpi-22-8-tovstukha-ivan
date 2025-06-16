const { authJwt } = require("../middleware");
const controller = require("../controllers/device.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.put(
    "/api/devices/:id/status",
    [authJwt.verifyToken, authJwt.isAdminOrManager],
    controller.updateStatus
  );

  app.delete(
    "/api/devices/:id",
    [authJwt.verifyToken, authJwt.isAdminOrManager],
    controller.delete
  );
};
