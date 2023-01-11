const Sequelize = require('sequelize');

// these links shuld be in the env variables but to make you try easy
const db = new Sequelize('tiiraakn', 'tiiraakn', '6xqhzl_0syfXAd4h4Gj2-NEfPTOM3BWi', {
    host: 'tiny.db.elephantsql.com',
    dialect: 'postgres'
  });

module.exports = db