# solita-bike-demo-app

## Prerequisites
    - node.js

## Configurations
    - Download data csvs from:
      - https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
      - https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
      - https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv
      - https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv
    - Place files to data folder in repo root

## Running
    - Start and init the database by running `docker-compose up --build` in repo root.
    - Start backend by running `npm i` and `npm start` in backend folder
    - Start frontend by running `npm i` and `npm start` in frontend folder