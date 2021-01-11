const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const SliderHint = sequelize.define(
    "SliderHint",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isVisible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {}
  );
  return SliderHint;
};
