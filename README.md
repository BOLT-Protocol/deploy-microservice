# deploy-microservice

---

## 部署前置

**所有要部署的agent機器需已安裝 Python, python-apt 跟 SSH**

本腳本使用 Ansible 撰寫，因此需要先行安裝 Ansible

## 部署步驟

### Step 1

建立 github ssh key，並存放至 /keys 內

```
$ cp YOURPATH/id_rsa deploy-microservice/keys/
$ cp YOURPATH/id_rsa.pub deploy-microservice/keys/
```

### step 4

手動部署合約

#### 安裝 Truffle


> BOLT使用Truffle專案來管理合約的編譯、部署、升版，故需要先安裝全局的truffle指令，truffle為一個npm套件

```
$ npm install -g truffle@4.1.14
```

#### clone 合約跟 gringotts 專案

> 一個是在 Ethereum 主鏈上的BOLT Contract合約，一個是提供中央式系統介接 Ethereum 主鏈的 Gringotts 程式，一個是模擬商業伺服器端的Wizard Nodejs Demo程式
> 請先從GitHub同步專案到本地端

```
$ git clone git@github.com:BOLT-Protocol/contracts.git
$ git clone git@github.com:BOLT-Protocol/gringotts.git
```

#### Contract

```
$ cd contracts
$ npm install
$ vim env.js
```

以下為 env.js 的設定(可複製 ./env/contracts/env.js 來進行修改使用)

```javascript
let env = {
  devnet: {
    web3Url: 'http://18.140.67.139:8545',  // 測試鏈位置
    privateKey: '9a13ccb9897d8bb75d18d1b763ce66b2467a942e4512f338aab048096aac0202', // 測試鏈錢包 privateKey
  },
  testnet: {
    web3Url: 'https://rinkeby.infura.io',
    privateKey: '9a13ccb9897d8bb75d18d1b763ce66b2467a942e4512f338aab048096aac0202',
  },
  mainnet: {
    web3Url: 'https://mainnet.infura.io',
    privateKey: '9a13ccb9897d8bb75d18d1b763ce66b2467a942e4512f338aab048096aac0202',
  }
};

module.exports = env;
```

改完設定檔後下下面指令

```
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
   > contract address:    0xeF37C171cF071bA540ea7589553C655162385099 << 這段
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

然後拿最後吐出的 `Deploying 'TWX' 的 contract address` 與 `Deploying 'Booster' 的 contract address` 來部署支援我們 TWX Token 的 Booster 合約到測試鏈節點

```
$ node testDeployBooster.js --assetAddress 0xeF37C171cF071bA540ea7589553C655162385099 --managerAddress 0xeF547DCca7F866965C3Aa4a2A13EEC09539A5a90 --network devnet

0xc83c6dC92Ca1F7dA508484684CfE89e558ebbb8a // Booster合約地址
```

接著拿著我們剛取得的 `Booster 合約地址` 到 `gringotts` 專案

#### gringotts

```
$ cd gringotts
$ npm install
$ vim env.js
```

以下為 env.js 的設定(可複製 ./env/contracts/env.js 來進行修改使用)

```javascript
...

let env = {
  web3Url: 'ws://18.140.67.139:8546',   // 測試鏈位置
  serverUrl: 'http://127.0.0.1:3001',
  serverAddress: '0xd0C9AB4388871c662e95BBD3286B00f2cEDD09CE',
  contractAddress: '',                  // 貼上剛剛拿到的 Booster 合約地址
  boosterPort: '3000',
  signerKey: '76a2c8b0be1eca1f6404ce35fa5f4acbc1ee9dc9768e5da16df40049054aeddf',
  btcKey:'934waTMCujKrTr3vWyL3EcoemM7y4wWNUKsEvZcrR4185VxQVUW',
  production: {
    username: 'howhow',                 // vars/all.yml 中設定的 postgresUser
    password: 'DRFnNN67',               // vars/all.yml 中設定的 postgresPassword
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

...
```

修改完後可以繼續下面的自動化腳本設定

### Step 3

設定相關設定檔:

- `inventory` 相關設定

  要部署機器的 host, port, ssh key,
  如果要使用 ssh 密碼登入可以使用 `ansible_password`，另外如果該 user 沒有 sudo 免打密碼，需加上 `ansible_sudo_pass`

- `vars` 相關設定變數

```
# ssh 登入的 user name
agent_user: ubuntu
bolt_main_ip: 192.168.2.20
bolt_microservice_ip: 192.168.2.62
howinvest_microservice_ip: 192.168.2.21

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

### Step 4

執行 ansible 腳本

```
$ ansible-playbook multi-playbook.yml
```

### 驗證部署成功

**需注意現在版本 BOLT-AUTOMATION 整合測試途中產生的資料會殘留在 level db 與 postgres 中**

- 到個機器下 `pm2 list`、`pm2 logs` 查看有無錯誤訊息
- 進到 bolt_main 的 `BOLT-AUTOMATION` 底下執行 `npm test` 整合性測試，如果測試全過就代表部署成功

## 如果只需要部署某一台

一樣填好上面的 Step 1，然後註解掉 `multi-playbook.yml` 其他 hosts，然後執行 Step 2 即可