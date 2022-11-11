import React from 'react';
import axios from 'axios';
import { Station } from '../types/station';
import Pagination from '../components/pagination';

const Stations = () => {
  const [stations, setStations] = React.useState([]);
  const [orderby, setOrderBy] = React.useState('nimi');
  const [limit, setLimit] = React.useState(100);
  const [offset, setOffset] = React.useState(0);
  const [ordering, setOrdering] = React.useState('ASC');

  const toggleOrdering = () => {
    setOrdering(ordering === 'ASC' ? 'DESC' : 'ASC');
  }

  React.useEffect(() => {
    axios
      .get(`http://localhost:3002/station`, {params: {limit, offset, orderby, ordering}})
      .then((response) => setStations(response.data));
  }, [orderby, limit, offset, ordering]);

  return (
    <div>
      <Pagination
        limit={limit}
        offset={offset}
        offsetChange={(value: number) => setOffset(value)}
        limitChange={(value: number) => setLimit(value)}
      />
      <ul className="journeys bg-slate-300 font-bold">
        <li className="grid grid-cols-9 p-2 border-b" key={'header'}>
          <p className="text-left"> #. </p>
          <p className="text-left col-span-2 cursor-pointer" onClick={() => {setOrderBy('nimi'); toggleOrdering()}}> Name </p>
          <p className="text-left col-span-2 cursor-pointer" onClick={() => {setOrderBy('osoite'); toggleOrdering()}}> Address </p>
          <p className="text-left cursor-pointer" onClick={() => {setOrderBy('city'); toggleOrdering()}}> City </p>
          <p className="text-left cursor-pointer" onClick={() => {setOrderBy('operator'); toggleOrdering()}}> Operator </p>
          <p className="text-left cursor-pointer" onClick={() => {setOrderBy('x_coordinate'); toggleOrdering()}}> X-coordinate </p>
          <p className="text-left cursor-pointer" onClick={() => {setOrderBy('y_coordinate'); toggleOrdering()}}> Y-coordinate </p>
        </li>
      </ul>
      <ul className="journeys">
        {stations.map((station: Station, i: number) => (
          <li className="grid grid-cols-9 p-2 border-b" key={station.id}>
            <p className="text-left"> {i + 1 + offset}. </p>
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
};

export default Stations;
