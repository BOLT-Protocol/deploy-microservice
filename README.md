# deploy-microservice

---

## 部署前置

**所有要部署的agent機器需已安裝 Python, python-apt 跟 SSH**

本腳本使用 Ansible 撰寫，因此需要先行安裝 Ansible

## 部署步驟

### Step 1

建立 github ssh key，並存放至 /keys 內

```
cp YOURPATH/id_rsa deploy-microservice/keys/
cp YOURPATH/id_rsa.pub deploy-microservice/keys/
```

### Step 2

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

### Step 3

執行 ansible 腳本

`ansible-playbook multi-playbook.yml`

### Step 4

驗證部署成功

**需注意現在版本 BOLT-AUTOMATION 整合測試途中產生的資料會殘留在 level db 與 postgres 中**

- 到個機器下 `pm2 list`、`pm2 logs` 查看有無錯誤訊息
- 進到 bolt_main 的 `BOLT-AUTOMATION` 底下執行 `npm test` 整合性測試，如果測試全過就代表部署成功

## 如果只需要部署某一台

一樣填好上面的 Step 1，然後註解掉 `multi-playbook.yml` 其他 hosts，然後執行 Step 2 即可