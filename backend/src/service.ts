import { Request, Response } from "express";
import { queryJourneyCount, queryJourneys, queryStationAvgDistanceFrom, queryStationAvgDistanceTo, queryStationEndingCount, queryStationEndingToTop, queryStations, queryStationsByIds, queryStationStartingCount, queryStationStartingFromTop } from "./queries";
import { StationStatistics } from "./types/Station";

  export async function getStations(request: Request, response: Response){
    const limit = (request.query.limit || '100') as string;
    const offset = (request.query.offset || '0') as string;
    const orderBy = (request.query.orderby || 'nimi') as string;
    const ordering = (request.query.ordering || 'ASC') as string;
    return await queryStations({limit, offset, orderBy, ordering})
    .then((res) => response.status(200).json(res?.rows))
    .catch((err) => response.status(500).json(err.message)) 
  }

  export async function getStationsByIds(request: Request, response: Response) {
    return await queryStationsByIds(request.body.join(', '))
    .then((res) => response.status(200).json(res?.rows))
    .catch((err) => response.status(500).json(err.message)) 
  }

  export async function getStationStatistics(request: Request, response: Response) {
    const from = (request.query.from ?? '2000-01-01') as string;
    const to = (request.query.to ?? '2022-01-01') as string;
    const id = request.params.id as string;
    try {
      let station: StationStatistics = {id: id};
      station.starting_count = await queryStationStartingCount(id, from, to).then(res => res.rows[0].count);
      station.ending_count = await queryStationEndingCount(id, from, to).then(res => res.rows[0].count);
      station.avg_dist_from = await queryStationAvgDistanceFrom(id, from, to).then(res => res.rows[0].avg);
      station.avg_dist_to = await queryStationAvgDistanceTo(id, from, to).then(res => res.rows[0].avg);
      station.starting_from_top = await queryStationStartingFromTop(id, from, to).then(res => res.rows);
      station.ending_to_top = await queryStationEndingToTop(id, from, to).then(res => res.rows);
      response.status(200).json(station);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
  
  export async function getJourneyCount(request: Request, response: Response) {
    return await queryJourneyCount()
    .then((res) => response.status(200).json(res?.rows))
    .catch((err) => response.status(500).json(err.message)) 
  }
  
  export async function getJourneys(request: Request, response: Response){
    const limit = (request.query.limit || '100') as string;
    const offset = (request.query.offset || '0') as string;
    const orderBy = (request.query.orderby || 'id') as string;
    const ordering = (request.query.ordering || 'ASC') as string;

    const q = request.query;

    const endStationName = q.endStationName as string;
    const startStationName = q.startStationName as string;
    const from = (q.from ?? '2000-01-01') as string;
    const to = (q.to ?? '2022-01-01') as string;
    const minDist = (q.minDist ?? '0') as string;
    const maxDist = (q.maxDist ?? '9999999999') as string;
    const minDur = (q.minDur ?? '0') as string;
    const maxDur = (q.maxDur ?? '9999999999999') as string;

    return await queryJourneys({limit, offset, orderBy, ordering}, {endStationName, startStationName}, {from, to, minDist, maxDist, minDur, maxDur})
    .then((res) => response.status(200).json(res?.rows))
    .catch((err) => response.status(500).json(err.message))     
  }