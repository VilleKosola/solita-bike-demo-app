const Pool = require('pg').Pool

const client = new Pool({
  user: 'bikeapp',
  host: 'localhost',
  database: 'bikeapp',
  password: 'bikeapp',
  port: 5432,
})

const getStations = (request, response) => {
  client.query('SELECT * FROM station ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getJourneyCount = (request, response) => {
  client.query('SELECT COUNT(*) FROM journey', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getJourneys = (request, response) => {
  let limit = request.params.limit || 100;
  let offset = request.params.offset || 0;
  let orderBy = request.params.offset || 'departuredate';
  client.query(`SELECT * FROM journey ORDER BY ${orderBy} ASC LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getStations,
  getJourneys,
  getJourneyCount
}
