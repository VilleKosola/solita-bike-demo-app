import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import * as service from './service';
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
  origin: allowedOrigins,
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
  methods: 'GET, POST, PUT, DELETE'
};
app.use(cors(options));
app.use(express.json());


app.get('/stations', service.getStations)
app.get('/station/stats/:id', service.getStationStatistics)
app.post('/stations', service.getStationsByIds)

app.get('/journey', service.getJourneys)
app.get('/journey-count', service.getJourneyCount)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
