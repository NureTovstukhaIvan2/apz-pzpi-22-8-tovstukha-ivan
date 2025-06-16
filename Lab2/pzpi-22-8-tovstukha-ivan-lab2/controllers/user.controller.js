const db = require("../models");
const User = db.user;
const Aquarium = db.aquarium;
const Op = db.Sequelize.Op;

// Створення користувача
exports.create = (req, res) => {
  // Валідація
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.name ||
    !req.body.role
  ) {
    res.status(400).send({
      message: "Всі поля обов'язкові!",
    });
    return;
  }

  // Створення користувача
  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    name: req.body.name,
    role: req.body.role,
  };

  // Збереження в БД
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Помилка при створенні користувача.",
      });
    });
};

// Отримання всіх користувачів (тільки для адмінів)
exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Помилка при отриманні користувачів.",
      });
    });
};

// Отримання одного користувача
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Не вдалося знайти користувача з id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Помилка при отриманні користувача з id=" + id,
      });
    });
};

// Оновлення користувача
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Користувача оновлено успішно.",
        });
      } else {
        res.send({
          message: `Не вдалося оновити користувача з id=${id}. Можливо, користувача не знайдено або тіло запиту порожнє!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Помилка при оновленні користувача з id=" + id,
      });
    });
};

// Видалення користувача
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Користувача видалено успішно!",
        });
      } else {
        res.send({
          message: `Не вдалося видалити користувача з id=${id}. Можливо, користувача не знайдено!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Не вдалося видалити користувача з id=" + id,
      });
    });
};

// Отримання акваріумів користувача
exports.getUserAquariums = (req, res) => {
  const userId = req.params.userId;

  User.findByPk(userId, {
    include: [
      {
        model: Aquarium,
        as: "aquariums",
        through: { attributes: [] },
      },
    ],
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Користувача не знайдено." });
      }
      res.send(user.aquariums);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
