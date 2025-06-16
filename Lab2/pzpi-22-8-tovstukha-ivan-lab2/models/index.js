const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Моделі
db.user = require("./user.model.js")(sequelize, Sequelize);
db.aquarium = require("./aquarium.model.js")(sequelize, Sequelize);
db.device = require("./device.model.js")(sequelize, Sequelize);
db.sensorReading = require("./sensorReading.model.js")(sequelize, Sequelize);

// Зв'язки
db.user.belongsToMany(db.aquarium, { through: "user_aquariums" });
db.aquarium.belongsToMany(db.user, { through: "user_aquariums" });
db.aquarium.hasMany(db.device, { as: "devices" });
db.aquarium.hasMany(db.sensorReading, { as: "readings" });

module.exports = db;
