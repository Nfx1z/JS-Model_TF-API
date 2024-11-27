#!/bin/bash
# run this script to install all the dependencies
# run this script on wsl such as ubuntu
echo "Installing hapi..."
npm install @hapi/hapi@21.3.12

echo "Installing hapi-boom..."
npm install @hapi/boom@10.0.1

echo "Installing dotenv..."
npm install doten@16.4.5

echo "Installing crypto..."
npm install crypto@1.0.1

echo "Installing firebase-admin..."
npm install firebase-admin@13.0.1

echo "Installing tensorflow..."
npm install @tensorflow/tfjs-node@4.14.0

echo "Installing firestore..."
npm install @google-cloud/firestore@7.10.0

echo "Installing nodemon..."
npm install nodemon --save-dev

npm audit fix