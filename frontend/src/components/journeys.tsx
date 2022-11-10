import React from "react";
import axios from "axios";
import dayjs from "dayjs";

type Journey = {
  id: string,
  departuredate: string,
  returndate: string,
  return_station_name: string,
  departure_station_name: string,
  distance: number,
  duration: number
}

function Journeys() {
  const [journeys, setJourneys] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:3002/journey/100/0")
      .then((response) => setJourneys(response.data));
  }, []);

  return (
    <ul className="journeys">
      {journeys.map((journey: Journey, i: number) => (
        <li className="grid grid-cols-3 p-2 border-b" key={journey.id}>
          <h4 className="text-left"> {i+1}. {journey.departure_station_name} - {journey.return_station_name}</h4>
          <p className="">{dayjs(journey.departuredate).format('DD.MM.YYYY')} - {dayjs(journey.returndate).format('DD.MM.YYYY')}</p>
          <p className="text-right">Distance: {journey.distance / 1000}km Duration: {Math.floor(journey.duration/60) + 'min ' + journey.duration%60}s</p>
        </li>
      ))}
    </ul>
  );
}

export default Journeys;