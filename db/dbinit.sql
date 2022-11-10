DROP TABLE IF EXISTS journey;
DROP TABLE IF EXISTS station;

-- TODO: add constrains handling
CREATE TABLE station (
    id INT PRIMARY KEY,
    fid INT,
    nimi VARCHAR(100),
    name VARCHAR(100),
    namn VARCHAR(100),
    osoite VARCHAR(100),
    address VARCHAR(100),
    city VARCHAR(100),
    stad VARCHAR(100),
    operator VARCHAR(100),
    capasity INT,
    x_coordinate REAL NOT NULL,
    y_coordinate REAL NOT NULL
);

CREATE TABLE journey (
    id SERIAL PRIMARY KEY,
    departuredate DATE NOT NULL,
    returndate DATE NOT NULL,
    departure_station INT NOT NULL REFERENCES station (id),
    departure_station_name  VARCHAR(100),
    return_station_name  VARCHAR(100),
    return_station INT NOT NULL REFERENCES station (id),
    distance REAL NOT NULL CHECK (distance >= 10),
    duration REAL NOT NULL CHECK (duration >= 10)
);

SET session_replication_role = 'replica';

COPY station(fid, id, nimi, namn, name, osoite, address, city, stad, operator, capasity, x_coordinate, y_coordinate)
FROM '/var/lib/postgresql/csvs/stations.csv'
DELIMITER ','
CSV HEADER;

COPY journey(departuredate, returndate, departure_station, departure_station_name, return_station, return_station_name, distance, duration)
FROM '/var/lib/postgresql/csvs/2021-05.csv'
DELIMITER ','
CSV HEADER
WHERE distance >= 10 and duration >= 10;

COPY journey(departuredate, returndate, departure_station, departure_station_name, return_station, return_station_name, distance, duration)
FROM '/var/lib/postgresql/csvs/2021-06.csv'
DELIMITER ','
CSV HEADER
WHERE distance >= 10 and duration >= 10;

COPY journey(departuredate, returndate, departure_station, departure_station_name, return_station, return_station_name, distance, duration)
FROM '/var/lib/postgresql/csvs/2021-07.csv'
DELIMITER ','
CSV HEADER
WHERE distance >= 10 and duration >= 10;

DELETE FROM journey 
WHERE departure_station NOT IN (
  SELECT id FROM station
);

DELETE FROM journey 
WHERE return_station NOT IN (
  SELECT id FROM station
);

CREATE INDEX idx_journey_id
ON journey (id);

CREATE INDEX idx_station_id
ON station (id);