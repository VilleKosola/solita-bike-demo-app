import { getParams } from "./helperService";

export interface JournalParams {
  limit:number, 
  offset:number, 
  orderby:string, 
  ordering:string, 
  startStationName: string, 
  endStationName: string, 
  from: string, 
  to: string, 
  minDist: number, 
  maxDist: number, 
  minDur: number, 
  maxDur: number
}

const getAllJourneys = async (p: JournalParams) => {
  try {
    const response = fetch(
      `http://localhost:3002/journey?` +
      getParams({...p})
    );
    return (await response).json();
  } catch (error) {
    return [];
  }
};

export { getAllJourneys };
