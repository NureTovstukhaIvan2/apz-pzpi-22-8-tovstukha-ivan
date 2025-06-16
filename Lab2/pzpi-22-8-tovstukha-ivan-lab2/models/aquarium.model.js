module.exports = (sequelize, Sequelize) => {
  const Aquarium = sequelize.define("aquarium", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    volume: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  return Aquarium;
};
