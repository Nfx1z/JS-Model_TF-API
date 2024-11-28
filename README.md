# Machine Learning API Service

## Project Overview

A robust API service built with Hapi.js that serves machine learning model predictions.

## Techincal Stack

- Node.js v18.20.5
- Hapi JS Framework
- Google Cloud Storage
- Firestore
- Environment Variables (.env)

## Project Structure

```bash
├── script.sh          # Script to install dependencies
└── src/
    ├── server/
    │   ├── server.js               # Main server configuration
    │   └── routes.js               # API route definitions
    ├── handler/
    │   ├── historyHandler.js       # Fetch all data from firestore
    │   └── predictHandler.js       # ML model loading logic
    ├── controller/
    │   └── predictController.js    # Controller for predict
    ├── storeData.js        # Store the results to firestore
    └── loadModel.js        # Load the model from specific url
```

## Setup Instructions

### I. Environment Setup

1. Clone the repository `git clone <repository-url>`
2. Install WSL `ubuntu` in your Windows.
3. Open the WSL terminal in Visual Studio Code and navigate to your project.
4. Run `bash modules.sh` if you are new to WSL.
5. Or you can run the following command at your WSL main directory to install the configuration:

    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    nvm install 18
    nvm use 18
    ```

6. Back to your project directory.
7. Install dependencies by run `npm install`
8. If error occurs, run:

    ```bash
    sudo apt-get update
    sudo apt-get install build-essential
    npm rebuild @tensorflow/tfjs-node --build-from-source
    ```

    and then rerun the `npm install`

## II. Required Environment Variables

1. Create a `.env` file in the root directory of the project.
2. `GOOGLE_APPLICATION_CREDENTIALS`: Path to the Google Cloud service account key file.
3. `MODEL_URL`: URL of the ML model.
4. `FIRESTORE_COLLECTION`: Name of the Firestore collection.
5. `PROJECT_ID`: Google Cloud project ID.

## API Usage Guide

1. Start the server: `npm start`
2. Predict Image
    - Endpoints: **POST** `/predict`
    - Require `image` in the request body
3. Predict History
    - Endpoints: **GET** `/predict/histories`

## Important Notes

1. Ensure the key passed in the request body is `image`.
2. Ensure the `.env` file is correctly configured with the required environment variables.
3. Ensure the `key.json` file is present in the project root directory.
4. `key.json` is used for Firebase authentication.

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes and write tests
4. Submit a pull request with a clear description of your changes

> [!IMPORTANT]
> To see the module that this project use, run the following command in the project directory:
>
> ```bash
> echo "Modules: "
> npm ls --omit=dev --depth=0 | grep -o '── [^ ]*' | sed 's/^─//'
> ```
