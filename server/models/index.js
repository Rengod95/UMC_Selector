const Sequelize = require('sequelize');
const Keyword = require('./keyword');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Keyword = Keyword;


Keyword.init(sequelize);

module.exports = db;