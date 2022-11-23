import csv from 'csv-parser';
import { createReadStream, writeFileSync } from 'fs';
import fs from 'fs/promises';
import { finished } from 'stream/promises';
import path from 'path';
import { Journey } from './types/Journey';
import { Station } from './types/Station';
import _ from 'lodash'
import * as db from '../db/index'
import format from 'pg-format'

const dataDir = '../../../data';
let stations: Station[] = [];

const getDirFiles = async () => {
    let files: any[] = []
    const directoryPath = path.join(__dirname, dataDir);
    try {
        files = await fs.readdir(directoryPath);
      } catch (err) {
        console.error('Unable to scan directory: ' + err);
      }
    return files.filter(f => f !== 'stations.csv');
}

const validStationData = (station: Station) => {
    if (!Number(station.fid) || !station.nimi || !station.x_coordinate || !station.y_coordinate || !station.id) {
        return false;
    }
    return true;
}
const validJourneyData = (journey: Journey) => {
    const ISO_8601_FULL = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i
    if (!journey.return_station || !journey.departure_station || journey.distance < 10 || journey.duration < 10) {
        return false;
    } else if (journey.departuredate.length < 18 || journey.returndate.length < 18 || !ISO_8601_FULL.test(journey.departuredate) || !ISO_8601_FULL.test(journey.returndate)) {
        return false;
    } 
    // Test if stations exists
    let found = false;
    for (let i = 0; i < stations.length; i++) {
        if (stations[i].id == journey.return_station){
            found = true;
            break;
        }
    }
    if (!found) {
        return false;
    }
    found = false;
    for (let i = 0; i < stations.length; i++) {
        if (stations[i].id == journey.departure_station){
            found = true;
            break;
        }
    }
    if (!found) {
        return false;
    }

    return true;
}

const parseStationsFile = async (fileName: string) => {
    const records: any[] = [];
    const rejectedRecords: any[] = [];
    const parser = createReadStream(path.join(__dirname, dataDir, fileName))
            .pipe(csv(['fid', 'id', 'nimi', 'namn', 'name', 'osoite', 'address', 'city', 'stad', 'operator', 'capasity', 'x_coordinate', 'y_coordinate'] ))
    parser.on('readable', async function(){
        let record; 
        while ((record = parser.read()) !== null) {
                if (validStationData(record)) {
                    const s: Station = {
                        fid: Number(record.fid),
                        id: record.id,
                        nimi: record.nimi,
                        namn: record.namn,
                        name: record.name,
                        osoite: record.osoite,
                        address: record.address,
                        city: record.city,
                        stad: record.stad,
                        operator: record.operator,
                        capasity: record.capasity,
                        x_coordinate: record.x_coordinate,
                        y_coordinate: record.y_coordinate
                    } 
                    //insert data to db
                    await insertDataToTable([s], 
                        `INSERT INTO station(fid, id, nimi, namn, name, osoite, address, city, stad, operator, capasity, x_coordinate, y_coordinate) 
                        VALUES %L
                        RETURNING *`
                    )
                    records.push(s);
                } else {
                    rejectedRecords.push(record)
                }
            }
        });
    await finished(parser);
    return {records, rejectedRecords};
}

const parseJourneysCsv = async (fileName: string) => {
    let records: any[] = [];
    const rejectedRecords: any[] = [];
    const parser = createReadStream(path.join(__dirname, dataDir, fileName))
            .pipe(csv(['departuredate', 'returndate', 'departure_station', 'departure_station_name', 'return_station', 'return_station_name', 'distance', 'duration']))
    parser.on('readable', async function(){
        let index = 0;
        let record; 
        while ((record = parser.read()) !== null) {
                const j: Journey = { 
                    departuredate: record.departuredate, 
                    returndate: record.returndate,
                    departure_station: record.departure_station,
                    departure_station_name: record.departure_station_name,
                    return_station: record.return_station,
                    return_station_name: record.return_station_name,
                    distance: Number(record.distance),
                    duration: Number(record.duration), 
                }
                if (validJourneyData(j)) {
                    records.push(j);
                } else {
                    rejectedRecords.push({...record})
                }
                index += 1;
                if (index%1000 == 0) {
                    console.log(`parsed and inserted ${index} journeys`)
                }
            }
        });
    await finished(parser);
    return {records, rejectedRecords};
}

const insertDataToTable = async (data: any[], text: string) => {
    const values = data.map(d => Object.values(d));
    try {
        return await db.query(format(text, values))  
    } catch (error) {
        console.log('insert failed', data)
    }
}

const copyCsvToPG = async (csv: string) => {
    db.queryWithCopy("COPY journey(departuredate, returndate, departure_station, departure_station_name, return_station, return_station_name, distance, duration) FROM STDIN DELIMITER ',' CSV HEADER", csv);//'src/dataTemp.csv');
}

const createTables = async () => {
    await db.query("DROP TABLE IF EXISTS journey;")
    await db.query("DROP TABLE IF EXISTS station;")

    await db.query(`CREATE TABLE station (
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
    );`);
    
    await db.query(`CREATE TABLE journey (
        id SERIAL PRIMARY KEY,
        departuredate DATE NOT NULL,
        returndate DATE NOT NULL,
        departure_station INT NOT NULL REFERENCES station (id),
        departure_station_name  VARCHAR(100),
        return_station_name  VARCHAR(100),
        return_station INT NOT NULL REFERENCES station (id),
        distance REAL NOT NULL CHECK (distance >= 10),
        duration REAL NOT NULL CHECK (duration >= 10)
    );`);
} 

function jsonToCsv(items: any[]) {
    const header = Object.keys(items[0]);
  
    const headerString = header.join(',');
  
    // handle null or undefined values here
    const replacer = (key: string, value: any) => value ?? '';
  
    const rowItems = items.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
  
    // join header and body, and break into separate lines
    const csv = [headerString, ...rowItems].join('\r\n');
    return csv;
}

const initData = async () => {  
    if (!(await db.query('SELECT * FROM station')).rows.length || !(await db.query('SELECT * FROM journey LIMIT 5')).rows.length) {
        console.time('ImportData Process')
        const files = await getDirFiles();
        console.log('files read',files);
        
        // init tables
        await createTables();
    
        console.time('Data parsing')
        let journeys: Journey[] = [];
        let rejections: any = [];
    
        // parse stations and add to db
        const parseResult = await parseStationsFile('stations.csv')
        stations = parseResult.records as Station[];
        rejections.push(parseResult.rejectedRecords);
        console.timeLog('Data parsing', 'stations parsed')
    
        //parse journeys
        // journeys = files.map()
        for (const fileName of files) {
            const parseResults = await parseJourneysCsv(fileName)
            const j = await parseResults.records as Journey[];
            rejections.push(parseResults.rejectedRecords);
            console.timeLog('Data parsing', 'journey file parsed: ', fileName)
            journeys = [...journeys, ...j];
        }
        console.log('Data parsed', `journeys: ${journeys.length}`, `stations: ${stations.length}`, `rejected count: ${_.flatten(rejections).length}`)
        console.timeEnd('Data parsing')

        //parse journeys back to csv for speed
        console.time('json to csv')
        const csvjourneys = jsonToCsv(journeys)
        console.timeEnd('json to csv')
        console.log('Inserting journeys to db...')

        //copy journeys to db
        console.time('journeys to db')
        await copyCsvToPG(csvjourneys)

    } else {
        console.log('Data already initialized. No initial action needed.')
    }
}

export {
    initData
}