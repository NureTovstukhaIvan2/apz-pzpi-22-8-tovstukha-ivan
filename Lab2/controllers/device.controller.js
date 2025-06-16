const db = require("../models");
const Device = db.device;

// Оновлення статусу пристрою
exports.updateStatus = (req, res) => {
  const id = req.params.id;

  Device.update({ status: req.body.status }, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Статус пристрою оновлено успішно.",
        });
      } else {
        res.send({
          message: `Не вдалося оновити статус пристрою з id=${id}. Можливо, пристрій не знайдено!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Помилка при оновленні статусу пристрою з id=" + id,
      });
    });
};

// Видалення пристрою
exports.delete = (req, res) => {
  const id = req.params.id;

  Device.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Пристрій видалено успішно!",
        });
      } else {
        res.send({
          message: `Не вдалося видалити пристрій з id=${id}. Можливо, пристрій не знайдено!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Не вдалося видалити пристрій з id=" + id,
      });
    });
};
