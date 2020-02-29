# deploy-microservice

---

## 部署前置

**所有要部署的agent機器需已安裝 Python@2.7.15, python-apt 跟 SSH**

本腳本使用 Ansible 撰寫，因此需要先行安裝 **Ansible@2.8.1**(太新版會有問題)

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install python-pip 
pip install -Iv ansible==2.8.1
```

## 部署流程

- [多機部署](./multi-deploy.md)
- [單機部署](./single-deploy.md)

## 自動 attach 腳本

```
(crontab -l 2>/dev/null; echo "0 */3 * * * node $HOME/gringotts/startAttach.js && node $HOME/gringotts/startFinalize.js > /dev/null 2>/tmp/cronlog.error") | crontab -
service cron start
```