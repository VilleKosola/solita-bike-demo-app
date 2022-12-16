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
  ### Production environment
  - Start the database with image build by running `docker-compose -f docker-compose.prod.yml up --build` in repo root.
    **Note!** If you have started dev environment before running production environment you may have to remove volumes from docker by running `docker-compose down --volumes`

  ### Dev environment
  - **Database**
    - Start the database by running `docker-compose up` in repo root.

  - **Backend**
    - Start frontend by running `npm i` and `npm start` in frontend folder

  - **Frontend**
    - Start frontend by running `npm i` and `npm start` in backend folder

## Tests
    - run tests by running 'npm test' in frontend or backend folder

