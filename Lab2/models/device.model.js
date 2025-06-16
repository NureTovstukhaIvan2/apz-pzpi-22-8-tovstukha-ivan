module.exports = (sequelize, Sequelize) => {
  const Device = sequelize.define("device", {
    type: {
      type: Sequelize.ENUM("THERMOSTAT", "AERATOR", "PH_CONTROLLER"),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("ACTIVE", "INACTIVE", "MAINTENANCE"),
      defaultValue: "ACTIVE",
    },
  });

  return Device;
};
