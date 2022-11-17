import { Request, Response } from "express";
import { queryJourneyCount, queryJourneys, queryStations } from "./queries";

export async function getStations(request: Request, response: Response){
    const limit = (request.query.limit || '100') as string;
    const offset = (request.query.offset || '0') as string;
    const orderBy = (request.query.orderby || 'nimi') as string;
    const ordering = (request.query.ordering || 'ASC') as string;
    return await queryStations({limit, offset, orderBy, ordering})
    .then((res) => response.status(200).json(res))
    .catch((err) => response.status(500).json(err.message)) 
  }
  
  export async function getJourneyCount(request: Request, response: Response) {
    return await queryJourneyCount()
    .then((res) => response.status(200).json(res))
    .catch((err) => response.status(500).json(err.message)) 
  }
  
  export async function getJourneys(request: Request, response: Response){
    const limit = (request.query.limit || '100') as string;
    const offset = (request.query.offset || '0') as string;
    const orderBy = (request.query.orderby || 'nimi') as string;
    const ordering = (request.query.ordering || 'ASC') as string;
    return await queryJourneys({limit, offset, orderBy, ordering})
    .then((res) => response.status(200).json(res))
    .catch((err) => response.status(500).json(err.message))     
  }