import * as db from '../db/index'
  
  export async function queryStations(params: {limit:string, offset:string, orderBy:string, ordering:string}){
      return db.query(`SELECT * FROM station ORDER BY ${params.orderBy} ${params.ordering} LIMIT ${params.limit} OFFSET ${params.offset}`);
  }
  
  export function queryJourneyCount() {
    return db.query('SELECT COUNT(*) FROM journey');
  }
  
  export function queryJourneys(params: {limit:string, offset:string, orderBy:string, ordering:string}){
    return db.query(`SELECT * FROM journey ORDER BY ${params.orderBy} ${params.ordering} LIMIT ${params.limit} OFFSET ${params.offset}`);
  }


