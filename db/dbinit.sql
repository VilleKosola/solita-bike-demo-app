DROP TABLE IF EXISTS journey;
DROP TABLE IF EXISTS station;

CREATE TABLE station (
    id SERIAL PRIMARY KEY,
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