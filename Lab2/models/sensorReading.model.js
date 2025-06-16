module.exports = (sequelize, Sequelize) => {
  const SensorReading = sequelize.define("sensorReading", {
    temperature: {
      type: Sequelize.DECIMAL(5, 2),
    },
    oxygen_level: {
      type: Sequelize.DECIMAL(5, 2),
    },
    ph_level: {
      type: Sequelize.DECIMAL(4, 2),
    },
  });

  return SensorReading;
};
