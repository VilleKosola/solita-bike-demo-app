import { Pool, QueryResult } from 'pg';

  const client: Pool = new Pool({
    user: 'bikeapp',
    host: 'localhost',
    database: 'bikeapp',
    password: 'bikeapp',
    port: 5432,
  })


    export const query = (text: string, params?: any[]) => {
      return client.query(text, params)
    }
