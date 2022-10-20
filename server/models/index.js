const Sequelize = require('sequelize');
const Keyword = require('./keyword');
const User = require("./user");
const Part = require("./part");

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Keyword = Keyword;
db.User = User;
db.Part = Part;



Keyword.init(sequelize);
User.init(sequelize);
Part.init(sequelize);

Keyword.associate(db);
User.associate(db);


module.exports = db;