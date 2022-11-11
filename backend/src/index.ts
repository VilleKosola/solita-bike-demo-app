import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import * as db from './queries';
import cors from 'cors';

const app: Express = express();
const port = process.env.PORT || 3002;

dotenv.config();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const allowedOrigins = ['http://localhost:3001'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));
app.use(express.json());

app.get('/station/:limit/:offset', db.getStations)
app.get('/journey/:limit/:offset', db.getJourneys)
app.get('/journey-count', db.getJourneyCount)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
