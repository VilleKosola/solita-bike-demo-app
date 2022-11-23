import * as db from '../db/index'
  
  export async function queryStations(params: {limit:string, offset:string, orderBy:string, ordering:string}){
      return db.query(`SELECT * FROM station ORDER BY ${params.orderBy} ${params.ordering} LIMIT ${params.limit} OFFSET ${params.offset}`);
  }
  
  export function queryJourneyCount() {
    return db.query('SELECT COUNT(*) FROM journey');
  }

  export function queryStationsByIds(ids: string){
    return db.query(`SELECT * FROM station WHERE ID IN (${ids})`);
  }

  export function queryStationStartingCount(id: string, from: string, to: string){
    return db.query(`
    SELECT COUNT(*) 
    FROM journey 
    WHERE departure_station = ${id} AND departuredate >= '${from}' AND departuredate <= '${to}'
    `);
  }

  export function queryStationEndingCount(id: string, from: string, to: string){
    return db.query(`
    SELECT COUNT(*) 
    FROM journey 
    WHERE return_station = ${id} AND departuredate >= '${from}' AND departuredate <= '${to}'
    `);
  }
  export function queryStationAvgDistanceFrom(id: string, from: string, to: string){
    return db.query(`
    SELECT AVG(distance) 
    FROM journey 
    WHERE departure_station = ${id} AND departuredate >= '${from}' AND departuredate <= '${to}'
    `);
  }
  export function queryStationAvgDistanceTo(id: string, from: string, to: string){
    return db.query(`
    SELECT AVG(distance) 
    FROM journey 
    WHERE return_station = ${id} AND departuredate >= '${from}' AND departuredate <= '${to}'
    `);
  }
  export function queryStationStartingFromTop(id: string, from: string, to: string){
    return db.query(`
    SELECT return_station_name, count(return_station) AS NumberOfTrips 
    FROM journey 
    WHERE departure_station = ${id} AND departuredate >= '${from}' AND departuredate <= '${to}'
    GROUP BY return_station_name 
    ORDER BY NumberOfTrips 
    DESC 
    LIMIT 5
    `);
  }
  export function queryStationEndingToTop(id: string, from: string, to: string){
    return db.query(`
    SELECT departure_station_name, count(departure_station) AS NumberOfTrips 
    FROM journey 
    WHERE return_station = ${id} AND departuredate >= '${from}' AND departuredate <= '${to}'
    GROUP BY departure_station_name 
    ORDER BY NumberOfTrips 
    DESC 
    LIMIT 5
    `);
  }

  
  export function queryJourneys(params: {limit:string, offset:string, orderBy:string, ordering:string}){
    return db.query(`SELECT * FROM journey ORDER BY ${params.orderBy} ${params.ordering} LIMIT ${params.limit} OFFSET ${params.offset}`);
  }


