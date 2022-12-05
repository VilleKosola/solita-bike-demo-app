import * as db from '../db/index'
import { select, like, between, or, insert, delete as d } from 'sql-bricks'
import { Station } from './types/Station';
import { Journey } from './types/Journey';

interface JournalParams {
  limit: string,
  offset: string,
  orderBy: string,
  ordering: string,
}
interface SearchParams {
  startStationName?: string,
  endStationName?: string,
}
interface FilterParams {
  from: string,
  to: string,
  minDist: string,
  maxDist: string,
  minDur: string,
  maxDur: string
}

export async function queryStations(params: { limit: string, offset: string, orderBy: string, ordering: string, stationname: string }) {
  return db.query(`
      SELECT * 
      FROM station 
      WHERE lower(nimi) LIKE '%${params.stationname.toLowerCase()}%'
      ORDER BY ${params.orderBy} ${params.ordering} 
      LIMIT ${params.limit} 
      OFFSET ${params.offset}
      `);
}

export function queryJourneyCount() {
  return db.query('SELECT COUNT(*) FROM journey');
}

export function queryStationsByIds(ids: string) {
  return db.query(`SELECT * FROM station WHERE ID IN (${ids})`);
}

export function queryStationStartingCount(id: string, from: string, to: string) {
  return db.query(`
    SELECT COUNT(*) 
    FROM journey 
    WHERE departure_station = ${id} AND departuredate >= '${from}' AND departuredate <= '${to}'
    `);
}

export function queryStationEndingCount(id: string, from: string, to: string) {
  return db.query(`
    SELECT COUNT(*) 
    FROM journey 
    WHERE return_station = ${id} AND departuredate >= '${from}' AND departuredate <= '${to}'
    `);
}
export function queryStationAvgDistanceFrom(id: string, from: string, to: string) {
  return db.query(`
    SELECT AVG(distance) 
    FROM journey 
    WHERE departure_station = ${id} AND departuredate >= '${from}' AND departuredate <= '${to}'
    `);
}
export function queryStationAvgDistanceTo(id: string, from: string, to: string) {
  return db.query(`
    SELECT AVG(distance) 
    FROM journey 
    WHERE return_station = ${id} AND departuredate >= '${from}' AND departuredate <= '${to}'
    `);
}
export function queryStationStartingFromTop(id: string, from: string, to: string) {
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
export function queryStationEndingToTop(id: string, from: string, to: string) {
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

export async function insertStation(station: Station) {
  let query = insert().into('station', Object.keys(station)).values(Object.values(station)).toString();
  return db.query(query + ' RETURNING *');
}

export function removeStation(id: string) {
  let query = d().from('station').where('id', id).toString();
  return db.query(query + ' RETURNING id');
}

export function queryJourneys(params: JournalParams, searchParams: SearchParams, fp: FilterParams) {
  const { from, to, minDist, maxDist, minDur, maxDur } = fp;
  let query = select().from('journey').orderBy(`${params.orderBy} ${params.ordering}`);
  if (searchParams.endStationName) {
    query = query.where(or(like('return_station_name', `%${searchParams.endStationName}%`), like('departure_station_name', `%${searchParams.endStationName}%`)))
  }
  query = query.where(between('departuredate', from, to)).and(between('distance', Number(minDist), Number(maxDist))).and(between('duration', minDur, maxDur))
  let queryString = query.toString();
  queryString += ` LIMIT ${params.limit} OFFSET ${params.offset}`
  return db.query(queryString);
}

export async function insertJourney(station: Journey) {
  let query = insert().into('journey', Object.keys(station)).values(Object.values(station)).toString();
  return db.query(query + ' RETURNING *');
}

export function removeJourney(id: string) {
  let query = d().from('journey').where('id', id).toString();
  return db.query(query + ' RETURNING id');
}
