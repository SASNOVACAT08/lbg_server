const { Sequelize } = require("sequelize");
const { DB, USERNAME, PASSWORD, HOST } = process.env;

const sequelize = new Sequelize(DB, USERNAME, PASSWORD, {
  host: HOST,
  dialect: "mysql",
  logging: false,
});

const Event = require("./models/Event")(sequelize);
const Game = require("./models/Game")(sequelize);
const Hint = require("./models/Hint")(sequelize);
const SliderHint = require("./models/SliderHint")(sequelize);
const User = require("./models/User")(sequelize);

User.hasMany(Event, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});

Game.hasMany(Event, {
  foreignKey: {
    name: "game_id",
    allowNull: false,
  },
});

Game.hasMany(Hint, {
  foreignKey: {
    name: "game_id",
    allowNull: false,
  },
});

Event.hasMany(Hint, {
  foreignKey: {
    name: "event_id",
    allowNull: true,
  },
});

User.hasMany(Hint, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});

Event.hasMany(SliderHint, {
  foreignKey: {
    name: "event_id",
    allowNull: true,
  },
});

User.hasMany(SliderHint, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});

Game.hasMany(SliderHint, {
  foreignKey: {
    name: "game_id",
    allowNull: false,
  },
});

sequelize.sync();

module.exports = {
  Game,
  Hint,
  SliderHint,
  Event,
  User,
};
