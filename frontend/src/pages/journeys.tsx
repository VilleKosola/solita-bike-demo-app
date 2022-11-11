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

function Journeys(props: {offset: number, limit: number}) {
  const [journeys, setJourneys] = React.useState([]);

  React.useEffect(() => {
    console.log('fetching from:', props.offset)
    axios
      .get(`http://localhost:3002/journey/${props.limit}/${props.offset}`)
      .then((response) => setJourneys(response.data));
  }, [props]);

  return (
    <div>
      <ul className="journeys bg-slate-300 font-bold">
        <li className="grid grid-cols-9 p-2 border-b" key={'header'}>
          <p className="text-left"> #. </p>
          <p className="text-left col-span-2"> Start station </p>
          <p className="text-left col-span-2"> End station </p>
          <p className="text-left"> Start date </p>
          <p className="text-left"> End date </p>
          <p className="text-left">Distance</p>
          <p className="text-left">Duration</p>
        </li>
      </ul>
      <ul className="journeys">
        {journeys.map((journey: Journey, i: number) => (
          <li className="grid grid-cols-9 p-2 border-b" key={journey.id}>
            <p className="text-left"> {i+1+props.offset}. </p>
            <p className="text-left col-span-2"> {journey.departure_station_name}</p>
            <p className="text-left col-span-2"> {journey.return_station_name}</p>
            <p className="text-left">{dayjs(journey.departuredate).format('DD.MM.YYYY')}</p>
            <p className="text-left">{dayjs(journey.returndate).format('DD.MM.YYYY')}</p>
            <p className="text-left">{journey.distance / 1000}km</p>
            <p className="text-left">{Math.floor(journey.duration/60) + 'min ' + journey.duration%60}s</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Journeys;