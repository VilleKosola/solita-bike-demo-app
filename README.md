# solita-bike-demo-app

## Prerequisites
    - node.js 18
    - docker

## Configurations
    - Download data csvs from:
      - https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
      - https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
      - https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv
      - https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv
    - Place files to data folder in backend folder root

## Running
  - **Database**
    - Start the database by running `docker-compose up` in repo root.
  
  - **Docker network**
    - create docker network by running `docker network create bikeapp-network`
    - connect db to network by running `docker network connect bikeapp-network db`

  - **Backend**
    - build backend docker container by running `docker build --tag backend-docker .` in backend folder
    - start backend container with network connection by running `docker run --network bikeapp-network --publish 3002:3002 backend-docker` in backend folder
        - > on first start app will validate the csv data and put it to the database. That will take 1+ minutes depending on your hardware.

  - **Frontend**
    - Start frontend by running `npm i` and `npm start` in frontend folder

## Tests
    - run tests by running 'npm test' in frontend or backend folder

TODO:
https://github.com/nvm-sh/nvm

tietokantamigraatiotyökalu: esim. flyway
