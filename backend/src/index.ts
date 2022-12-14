import express, { Express } from 'express';
import bodyParser from 'body-parser';
import * as service from './service';
import cors from 'cors';
import { initData } from './init-db-data';

const app: Express = express();
const port = 3002;


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
app.post('/station', service.createStation)
app.delete('/station/:id', service.deleteStation)

app.get('/journey', service.getJourneys)
app.post('/journey', service.createJourney)
app.delete('/journey/:id', service.deleteJourney)
app.get('/journey-count', service.getJourneyCount)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

initData();