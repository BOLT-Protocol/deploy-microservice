# 多機部署流程

## Step 1

建立 github ssh key，並存放至 /keys 內

```
$ cp YOURPATH/id_rsa deploy-microservice/keys/
```

[產生 github ssh key 到 github 設定](http://wiki.csie.ncku.edu.tw/github)

## Step 2

設定相關設定檔:

- `inventory` 相關設定

  要部署機器的 host, port, ssh key,
  如果要使用 ssh 密碼登入可以使用 `ansible_password`，另外如果該 user 沒有 sudo 免打密碼，需加上 `ansible_sudo_pass`

  ```
  [multi]  
  bolt_main ansible_ssh_host=52.199.189.73 ansible_port=22 ansible_user=tideops ansible_password=tidetidebolt ansible_sudo_pass=tidetidebolt
  bolt_microservice ansible_ssh_host=13.113.193.7 ansible_port=22 ansible_user=tideops ansible_password=tidetidebolt ansible_sudo_pass=tidetidebolt
  howinvest_microservice ansible_ssh_host=13.112.250.9 ansible_port=22 ansible_user=tideops ansible_password=tidetidebolt ansible_sudo_pass=tidetidebolt
  ```
  
  `ansible_ssh_host`: 目標主機 ip
  
  `ansible_port`: 目標主機 ssh port
  
  `ansible_user`: 目標主機 ssh username
  
  `ansible_password`: 目標主機 ssh user password
  
  `ansible_sudo_pass`: 目標主機 sudo password
  
  如果是使用 ssh key 連線，則需要改成
  
  ```
  [multi]  
  bolt_main ansible_ssh_host=52.199.189.73 ansible_port=22 ansible_user=tideops ansible_ssh_private_key_file=~/Downloads/Howinvest.Oregano.pem host_key_checking=False
  bolt_microservice ansible_ssh_host=13.113.193.7 ansible_port=22 ansible_user=tideops ansible_ssh_private_key_file=~/Downloads/Howinvest.Oregano.pem host_key_checking=False
  howinvest_microservice ansible_ssh_host=13.112.250.9 ansible_port=22 ansible_user=tideops ansible_ssh_private_key_file=~/Downloads/Howinvest.Oregano.pem host_key_checking=False
  ```
  
  `ansible_ssh_private_key_file`: 目標主機 ssh key 位置

- `vars` 相關設定變數

`# 記得修改各 microservice ip 與 web3Url ip`

```
# ssh 登入的 user name
agent_user: ubuntu
bolt_main_ip: 192.168.2.20                   # 記得修改
bolt_microservice_ip: 192.168.2.62           # 記得修改
howinvest_microservice_ip: 192.168.2.21      # 記得修改
web3Url: ""                                  # 記得修改 (ex: ws://3.82.172.25:8546)
privateKey: ''                               # 測試鏈錢包 privateKey 記得修改(ex: b0d8d7ce4cf809fc5cfc625c8f1bf8d055f31524e06a6d3945d46830c4bcba97)

authModulePassword: "P@ssw0rdHksNZX"
opAccountPassword: "P@ssw0rdHksNZX"
receptionDeskPassword: "P@ssw0rdHksNZX"
fundManagementPassword: "P@ssw0rdHksNZX"
# HOWHOW 幣代號(之後建立得好好幣別稱)
HOWHOWSymbol: "HOWHOW"

# postgres 帳密
postgresUser: "howhow"
postgresPassword: "DRFnNN67"

ssh_known_hosts_file: /home/{{ agent_user }}/.ssh/known_hosts
ssh_known_hosts_command: "ssh-keyscan -H -T 10"
ssh_known_hosts: github.com
```

## Step 3

執行 ansible 腳本 step 1

```
$ ansible-playbook multi-playbook-step1.yml
```

## step 4

step 4 手動部署合約 連線到 bolt_microservice 機器

### Contract

```
$ cd contracts
$ truffle deploy --reset


Compiling your contracts...
===========================
> Compiling ./contracts/Booster.sol
> Compiling ./contracts/ChallengeModule.sol
> Compiling ./contracts/EIP20/EIP20.sol
> Compiling ./contracts/EIP20/EIP20Interface.sol
> Compiling ./contracts/EIP20/ERC20MintableToken.sol
> Compiling ./contracts/EIP20/ERC223Receiving.sol
> Compiling ./contracts/EIP20/SafeMath.sol
> Compiling ./contracts/EIP20/TWX.sol
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/Util.sol
> Compiling ./contracts/UtilTest.sol
> Artifacts written to /Users/kais.lin/BOLT_WS/contracts/build/contracts
> Compiled successfully using:
   - solc: 0.5.8+commit.23d335f2.Emscripten.clang


Migrations dry-run (simulation)
===============================
> Network name:    'development-fork'
> Network id:      1
> Block gas limit: 0x7a1200


1_initial_migration.js
======================

...
...
...

Starting migrations...
======================
> Network name:    'development'
> Network id:      1
> Block gas limit: 0x7a1200


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x38725fa3cd74c17690180440872ada46d56f829daf073adf189137cc77a0b79b
   > Blocks: 0            Seconds: 0
   > contract address:    0x4D9Dec157A2E85E1F647b8F74cA84684EFF2E6dD
   > block number:        981844
   > block timestamp:     1575968039
   > account:             0x4FE387eBDa835fDb97854806503e8922BCea525b
   > balance:             904625697166532776746648320380374280103671755200316906550.897723417821325312
   > gas used:            228054
   > gas price:           1 gwei
   > value sent:          0 ETH
   > total cost:          0.000228054 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.000228054 ETH


2_deploy_contracts.js
=====================

   Deploying 'TWX'
   ---------------
   > transaction hash:    0x56f6bc08d4089a736c8a88858a677f7e4ecdd8771a1db3399b4054ef9f4ecc08
   > Blocks: 0            Seconds: 0
   > contract address:    0xeF37C171cF071bA540ea7589553C655162385099
   > block number:        981849
   > block timestamp:     1575968044
   > account:             0x4FE387eBDa835fDb97854806503e8922BCea525b
   > balance:             904625697166532776746648320380374280103671755200316906550.896148387821325312
   > gas used:            1533093
   > gas price:           1 gwei
   > value sent:          0 ETH
   > total cost:          0.001533093 ETH


   Deploying 'Booster'
   -------------------
   > transaction hash:    0x27087b4a16ee3224d4822176d79c0ec019cc9e4c93c47fa88a6ab2f5d9d255df
   > Blocks: 0            Seconds: 0
   > contract address:    0xeF547DCca7F866965C3Aa4a2A13EEC09539A5a90 << 這段
   > block number:        981851
   > block timestamp:     1575968046
   > account:             0x4FE387eBDa835fDb97854806503e8922BCea525b
   > balance:             904625697166532776746648320380374280103671755200316906550.891642912821325312
   > gas used:            4505475
   > gas price:           1 gwei
   > value sent:          0 ETH
   > total cost:          0.004505475 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.006038568 ETH


Summary
=======
> Total deployments:   3
> Final cost:          0.006266622 ETH
```

最後 `Deploying 'Booster' 的 contract address` 為 `Booster 合約地址`，將它貼到 `gringotts` 專案的設定檔

`Booster 合約地址` 到 `gringotts` 專案

### gringotts 也是再 bolt_microservice 機器

```
$ cd gringotts
$ npm install
$ vim env.js
```

以下為 env.js 的設定(可複製 ./env/contracts/env.js 來進行修改使用)

```javascript
var argv = require('minimist')(process.argv.slice(2), { string: ['contractAddress'] });
var operators = require('sequelize').Op;

let env = {
  web3Url: 'ws://127.0.0.1:8546',
  serverUrl: 'http://127.0.0.1:3001',
  serverAddress: '0xd0C9AB4388871c662e95BBD3286B00f2cEDD09CE',
  contractAddress: '',                  // 貼上剛剛拿到的 Booster 合約地址 記得修改
  boosterPort: '3000',
  signerKey: 'f0da8604c69db1c659b5a87bd0124088243ad215217a0e06ed5901de5c0162cd',
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
    repo: ''           // ipfs 位置，修改成自己的家目錄 (ex: /home/tideops/ipfs)
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
```

執行 db pgmigrate

```
$ npm run pgmigrate
```

之後可以下指令跑跑看是否成功，成功的話會看到

```
$ npm start
App listening on port 3000!
Gringotts is running on develop mode
Swarm listening on /ip4/127.0.0.1/tcp/4002/ipfs/QmXPjbkfFFGRNjJ3K3JUsxqvRfmzFCgR7f3GyotqHcjJSc
Swarm listening on /ip4/172.26.4.101/tcp/4002/ipfs/QmXPjbkfFFGRNjJ3K3JUsxqvRfmzFCgR7f3GyotqHcjJSc
Swarm listening on /ip4/127.0.0.1/tcp/4003/ws/ipfs/QmXPjbkfFFGRNjJ3K3JUsxqvRfmzFCgR7f3GyotqHcjJSc
IPFS node server ready.
expectedStageHeight: 1
gsn: 0
```

修改完後可以繼續下面的自動化腳本設定

## Step 5

執行 ansible 腳本 step 2

```
$ ansible-playbook multi-playbook-step2.yml
```

## 驗證部署成功

**需注意現在版本 BOLT-AUTOMATION 整合測試途中產生的資料會殘留在 level db 與 postgres 中**

- 到個機器下 `pm2 list`、`pm2 logs` 查看有無錯誤訊息
- 進到 bolt_main 的 `BOLT-AUTOMATION` 底下執行 `npm test` 整合性測試，如果測試全過就代表部署成功

pm2 指令如果沒有找到，可以使用 `/usr/local/lib/npm/bin/pm2`

## 如果只需要部署某一台

一樣填好上面的 Step 1，然後註解掉 `multi-playbook.yml` 其他 hosts，然後執行 Step 2 即可

## 重置成一個全新環境

下面所有的 npm restart 下完指令後，有執行成功沒出任何錯誤訊息 ctrl+c 直接退出就好

S2_BOLT-MicroService

```
$ pm2 stop all
$ cd contracts
部署新合約（請參考 https://github.com/BOLT-Protocol/deploy-microservice#contract）
$ cd ../gringotts
將合約地址貼到 env.js 後（請參考 https://github.com/BOLT-Protocol/deploy-microservice#gringotts-%E4%B9%9F%E6%98%AF%E5%86%8D-bolt_microservice-%E6%A9%9F%E5%99%A8）
$ npm restart
$ cd ../BOLT-CURRENCY
$ npm restart
$ cd ../BOLT-KEYCHAIN
$ npm restart
$ cd ../BOLT-KEYSTONE
$ npm restart
$ cd ../BOLT-TRUST
$ npm restart
$ pm2 restart all
```

S3_Howinvest-MicroServices

```
$ pm2 stop all
$ cd HowInvest-AuthModule
$ npm restart
$ cd ../HowInvest-Blacklist
$ npm restart
$ cd ../HowInvest-TradeModule
$ npm restart
$ pm2 restart all
```

S1_BOLT-MAIN

```
$ pm2 stop all
$ cd Howinvest-APIGateway
$ npm restart
$ pm2 restart all
```

## 自動 attach 腳本

```
(crontab -l 2>/dev/null; echo "0 */3 * * * node $HOME/gringotts/startAttach.js && node $HOME/gringotts/startFinalize.js > /dev/null 2>/tmp/cronlog.error") | crontab -
service cron start
```