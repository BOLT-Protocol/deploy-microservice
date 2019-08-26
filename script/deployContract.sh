#!/bin/bash
/usr/local/lib/npm/bin/truffle deploy --reset | tee ${1:-tmp}
TWX=$(cat tmp | grep "TWX: 0.*" | sed 's/  TWX: //g ')
Manager=$(cat tmp | grep "BoosterManager: 0.*" | sed 's/  BoosterManager: //g ')
Contract=$(node testDeployBooster.js --assetAddress $TWX --managerAddress $Manager)
echo "contract: $Contract"
env=${2:-./../gringotts/env.js}
sed -i "s#contractAddress:.*#contractAddress: '$Contract',#g" $env
rm -f ${1:-tmp}