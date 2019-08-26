var operators = require('sequelize').Op;

let env = {
  keyStoneUrl: 'http://127.0.0.1:5999',
  keyChainUrl: 'http://127.0.0.1:5566',
  development: {
    username: 'howhow',
    password: 'DRFnNN67',
    database: 'trust',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
    operatorsAliases: operators,
    pool: {
      max: 100
    }
  },
};

module.exports = env;