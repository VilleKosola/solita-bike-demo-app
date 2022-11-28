import * as db from '../db/index'
import { select, like, between, or } from 'sql-bricks'

interface JournalParams {
  limit:string, 
  offset:string, 
  orderBy:string, 
  ordering:string, 
}
interface SearchParams {
  startStationName?: string, 
  endStationName?: string, 
}
interface FilterParams {
  from:string, 
  to: string, 
  minDist: string, 
  maxDist: string, 
  minDur: string, 
  maxDur: string
}
  
  export async function queryStations(params: {limit:string, offset:string, orderBy:string, ordering:string, stationname: string}){
      return db.query(`
      SELECT * 
      FROM station 
      WHERE nimi LIKE '%${params.stationname}%'
      ORDER BY ${params.orderBy} ${params.ordering} 
      LIMIT ${params.limit} 
      OFFSET ${params.offset}
      `);
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

  
  export function queryJourneys(params: JournalParams, searchParams: SearchParams, fp:FilterParams){
    let query = select().from('journey').orderBy(`${params.orderBy} ${params.ordering}`);
    if (searchParams.endStationName) {
      query = query.where(or(like('return_station_name', `%${searchParams.endStationName}%`), like('departure_station_name', `%${searchParams.endStationName}%`)))
    } 
    // if (searchParams.startStationName) {
    //   query = query.where(like('departure_station_name', `%${searchParams.startStationName}%`))
    // }
    query = query.where(between('departuredate', fp.from, fp.to)).and(between('distance', Number(fp.minDist), Number(fp.maxDist))).and(between('duration', fp.minDur, fp.maxDur))
    let queryString = query.toString();
    queryString += ` LIMIT ${params.limit} OFFSET ${params.offset}`
    return db.query(queryString);//`SELECT * FROM journey ORDER BY ${params.orderBy} ${params.ordering} LIMIT ${params.limit} OFFSET ${params.offset}`);
  }


