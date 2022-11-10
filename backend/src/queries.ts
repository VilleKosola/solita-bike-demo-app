import { Request, Response } from "express";
import { Pool } from 'pg';

  const client: Pool = new Pool({
    user: 'bikeapp',
    host: 'localhost',
    database: 'bikeapp',
    password: 'bikeapp',
    port: 5432,
  })
  
  export function getStations(request: Request, response: Response){
    return client.query('SELECT * FROM station ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  export function getJourneyCount(request: Request, response: Response) {
    return client.query('SELECT COUNT(*) FROM journey', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  export function getJourneys(request: Request, response: Response){
    let limit = request.params.limit || 100;
    let offset = request.params.offset || 0;
    let orderBy = request.params.orderby || 'departuredate';
    return client.query(`SELECT * FROM journey ORDER BY ${orderBy} ASC LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


