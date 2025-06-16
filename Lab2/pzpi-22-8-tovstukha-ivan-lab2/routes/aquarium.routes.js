const { authJwt } = require("../middleware");
const controller = require("../controllers/aquarium.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Доступ для адмінів і менеджерів
  app.get(
    "/api/aquariums",
    [authJwt.verifyToken, authJwt.isAdminOrManager],
    controller.findAll
  );

  // Користувачі можуть отримувати тільки свої акваріуми (обробляється на фронтенді)
  app.get("/api/aquariums/:id", [authJwt.verifyToken], controller.findOne);

  // Створення, оновлення і видалення тільки для адмінів і менеджерів
  app.post(
    "/api/aquariums",
    [authJwt.verifyToken, authJwt.isAdminOrManager],
    controller.create
  );

  app.put(
    "/api/aquariums/:id",
    [authJwt.verifyToken, authJwt.isAdminOrManager],
    controller.update
  );

  app.delete(
    "/api/aquariums/:id",
    [authJwt.verifyToken, authJwt.isAdminOrManager],
    controller.delete
  );

  // Додавання пристроїв і показників
  app.post(
    "/api/aquariums/:aquariumId/devices",
    [authJwt.verifyToken, authJwt.isAdminOrManager],
    controller.addDevice
  );

  app.post(
    "/api/aquariums/:aquariumId/readings",
    [authJwt.verifyToken, authJwt.isAdminOrManager],
    controller.addSensorReading
  );

  // Прив'язка користувача до акваріума
  app.post(
    "/api/aquariums/:aquariumId/assign",
    [authJwt.verifyToken, authJwt.isAdminOrManager],
    controller.assignUser
  );
};
