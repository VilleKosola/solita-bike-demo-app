import React from "react";
import axios from "axios";
import dayjs from "dayjs";

type Station = {
  id: number,
  fid: number,
  nimi: string,
  osoite: string,
  city: string,
  operator: string,
  capasity: string,
  x_coordinate: number,
  y_coordinate: number
}

function Stations(props: {offset: number, limit: number}) {
  const [stations, setStations] = React.useState([]);

  React.useEffect(() => {
    console.log('fetching from:', props.offset)
    axios
      .get(`http://localhost:3002/station/${props.limit}/${props.offset}`)
      .then((response) => setStations(response.data));
  }, [props]);

  return (
    <div>
      <ul className="journeys bg-slate-300 font-bold">
        <li className="grid grid-cols-9 p-2 border-b" key={'header'}>
          <p className="text-left"> #. </p>
          <p className="text-left col-span-2"> Name </p>
          <p className="text-left col-span-2"> Address </p>
          <p className="text-left"> City </p>
          <p className="text-left"> Operator </p>
          <p className="text-left"> X-coordinate </p>
          <p className="text-left"> Y-coordinate </p>
        </li>
      </ul>
      <ul className="journeys">
        {stations.map((station: Station, i: number) => (
          <li className="grid grid-cols-9 p-2 border-b" key={station.id}>
            <p className="text-left"> {i+1+props.offset}. </p>
            <p className="text-left col-span-2"> {station.nimi}</p>
            <p className="text-left col-span-2"> {station.osoite}</p>
            <p className="text-left">{station.city}</p>
            <p className="text-left">{station.operator}</p>
            <p className="text-left">{station.x_coordinate}</p>
            <p className="text-left">{station.y_coordinate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stations;