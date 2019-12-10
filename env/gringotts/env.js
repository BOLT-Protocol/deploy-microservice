var argv = require('minimist')(process.argv.slice(2), { string: ['serverAddress', 'contractAddress'] });
var operators = require('sequelize').Op;

let env = {
  //web3Url: 'ws://localhost:8546',
  web3Url: 'ws://18.140.67.139:8546',
  serverUrl: 'http://127.0.0.1:3001',
  serverAddress: '0xd0C9AB4388871c662e95BBD3286B00f2cEDD09CE',
  contractAddress: '',
  boosterPort: '3000',
  signerKey: '76a2c8b0be1eca1f6404ce35fa5f4acbc1ee9dc9768e5da16df40049054aeddf',
  btcKey:'934waTMCujKrTr3vWyL3EcoemM7y4wWNUKsEvZcrR4185VxQVUW',
  production: {
    username: 'howhow',
    password: 'DRFnNN67',
    database: 'bolt',
    host: '127.0.0.1',
    port: '5432',
    dialect: 'postgres',
    logging: false,
    operatorsAliases: operators,
    pool: {
      max: 100
    }
  },
  generateEmptyTx: true,
  ipfs: {
    peers: [],
    repo: '/home/tideops/ipfs'
  }
};

if (!argv.hasOwnProperty('migrations-path')) {
  Object.keys(env).forEach((key) => {
    if (key != 'production') {
      let value = env[key];
      if (!value && value != false) {
        throw new Error('Missing config: ' + key);
      }
    }
  });
}

module.exports = env;