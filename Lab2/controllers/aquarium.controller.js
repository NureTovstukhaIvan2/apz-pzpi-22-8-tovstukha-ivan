const db = require("../models");
const Aquarium = db.aquarium;
const Device = db.device;
const SensorReading = db.sensorReading;
const User = db.user;

// Створення акваріума
exports.create = (req, res) => {
  // Валідація
  if (!req.body.name || !req.body.volume) {
    res.status(400).send({
      message: "Всі поля обов'язкові!",
    });
    return;
  }

  // Створення акваріума
  const aquarium = {
    name: req.body.name,
    volume: req.body.volume,
  };

  // Збереження в БД
  Aquarium.create(aquarium)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Помилка при створенні акваріума.",
      });
    });
};

// Отримання всіх акваріумів (для адмінів і менеджерів)
exports.findAll = (req, res) => {
  Aquarium.findAll({
    include: [
      {
        model: Device,
        as: "devices",
      },
      {
        model: SensorReading,
        as: "readings",
        limit: 1,
        order: [["createdAt", "DESC"]],
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Помилка при отриманні акваріумів.",
      });
    });
};

// Отримання одного акваріума
exports.findOne = (req, res) => {
  const id = req.params.id;

  Aquarium.findByPk(id, {
    include: [
      {
        model: Device,
        as: "devices",
      },
      {
        model: SensorReading,
        as: "readings",
        order: [["createdAt", "DESC"]],
        limit: 10,
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Не вдалося знайти акваріум з id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Помилка при отриманні акваріума з id=" + id,
      });
    });
};

// Оновлення акваріума
exports.update = (req, res) => {
  const id = req.params.id;

  Aquarium.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Акваріум оновлено успішно.",
        });
      } else {
        res.send({
          message: `Не вдалося оновити акваріум з id=${id}. Можливо, акваріума не знайдено або тіло запиту порожнє!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Помилка при оновленні акваріума з id=" + id,
      });
    });
};

// Видалення акваріума
exports.delete = (req, res) => {
  const id = req.params.id;

  Aquarium.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Акваріум видалено успішно!",
        });
      } else {
        res.send({
          message: `Не вдалося видалити акваріум з id=${id}. Можливо, акваріума не знайдено!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Не вдалося видалити акваріум з id=" + id,
      });
    });
};

// Додавання пристрою до акваріума
exports.addDevice = (req, res) => {
  const aquariumId = req.params.aquariumId;

  Aquarium.findByPk(aquariumId)
    .then((aquarium) => {
      if (!aquarium) {
        return res.status(404).send({ message: "Акваріум не знайдений." });
      }

      Device.create({
        aquariumId: aquariumId,
        type: req.body.type,
        name: req.body.name,
        status: req.body.status || "ACTIVE",
      })
        .then((device) => {
          res.send(device);
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Додавання показників сенсорів
exports.addSensorReading = (req, res) => {
  const aquariumId = req.params.aquariumId;

  Aquarium.findByPk(aquariumId)
    .then((aquarium) => {
      if (!aquarium) {
        return res.status(404).send({ message: "Акваріум не знайдений." });
      }

      SensorReading.create({
        aquariumId: aquariumId,
        temperature: req.body.temperature,
        oxygen_level: req.body.oxygen_level,
        ph_level: req.body.ph_level,
      })
        .then((reading) => {
          res.send(reading);
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Прив'язка користувача до акваріума
exports.assignUser = (req, res) => {
  const aquariumId = req.params.aquariumId;
  const userId = req.body.userId;

  Aquarium.findByPk(aquariumId)
    .then((aquarium) => {
      if (!aquarium) {
        return res.status(404).send({ message: "Акваріум не знайдений." });
      }

      User.findByPk(userId)
        .then((user) => {
          if (!user) {
            return res
              .status(404)
              .send({ message: "Користувач не знайдений." });
          }

          aquarium
            .addUser(user)
            .then(() => {
              res.send({ message: "Користувача успішно додано до акваріума." });
            })
            .catch((err) => {
              res.status(500).send({ message: err.message });
            });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
