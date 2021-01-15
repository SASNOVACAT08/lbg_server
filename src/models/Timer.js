const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Timer = sequelize.define(
    "Timer",
    {
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {}
  );
  return Timer;
};
