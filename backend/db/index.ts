import { Pool } from 'pg';
import {from as copyFrom} from 'pg-copy-streams'
import { Readable } from 'stream';
import dotenv from 'dotenv';

  dotenv.config();

  const vars = process.env

  const poolOptions = {
    user: vars['DB_USER'] || 'bikeapp',
    host: vars['DB_HOST'] || '',
    database: vars['DB_NAME'] || 'bikeapp',
    password: vars['DB_PASSWORD'] || 'bikeapp',
    port: Number(vars['DB_PORT']) || 5432,
  }

  const client: Pool = new Pool(poolOptions);


  export const query = (text: string, params?: any[]) => {
    return client.query(text, params)
  }


  export function queryWithCopy(query: string, csv: string) {
    client.connect(function (err, client, done) {
      const stream = client.query(copyFrom(query))
      const s = new Readable();
      s._read = () => {}; // redundant? see update below
      s.push(csv);
      s.push(null);
      stream.on('error', done)
      stream.on('finish', (e) => {
        console.timeEnd('journeys to db');         
        console.timeEnd('ImportData Process')
        console.log('Data import to DB successful!'); 
        done(e);})
      s.pipe(stream)
    })
  }

