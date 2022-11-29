# solita-bike-demo-app

## Prerequisites
    - node.js 18

## Configurations
    - Download data csvs from:
      - https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
      - https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
      - https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv
      - https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv
    - Place files to data folder in repo root

## Running
    - Start the database by running `docker-compose up` in repo root.
    - Start backend by running `npm i` and `npm start` in backend folder
      - > on first start app will validate the data and put it to the database. That will take 1+ minutes depending on your hardware.
    - Start frontend by running `npm i` and `npm start` in frontend folder

## Tests
    - run tests by running 'npm test' in frontend or backend folder

TODO:
https://github.com/nvm-sh/nvm

tietokantamigraatiotyökalu: esim. flyway

git hook formatoinnille ja lintille: Husky js / pre-push