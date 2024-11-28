#!/bin/bash

# Get the current directory
current_dir="$(pwd)"

# Enable exit on error
set -e

# Trap the ERR signal and handle it
trap 'echo "Error occurred on line $LINENO, exiting script."; exit 1' ERR

# script for installing node v18
config_nvm() {
    echo "Installing nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    nvm install 18
    nvm use 18
}

# script to install all the dependencies
install_dependencies() {       
    echo "Installing dependencies..."

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

    # npm audit fix will automatically fix vulnerabilities in your project dependencies.    
    echo "Running npm audit fix..."
    npm audit fix
}

# script for rebuilding tensorflow
rebuild_dependencies() {
    echo "Rebuilding tensorflow..."
    sudo apt-get update
    sudo apt-get install build-essential
    npm rebuild @tensorflow/tfjs-node --build-from-source
}

# Change to the main directory
cd

# Install the configuration for nvm
config_nvm

# Change back to the original directory
cd "$current_dir"

# Install the dependencies
install_dependencies

# Rebuild the dependencies
rebuild_dependencies

# reinstall dependencies
install_dependencies