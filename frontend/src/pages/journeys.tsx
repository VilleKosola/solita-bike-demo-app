import React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Journey } from '../types/journey';
import Pagination from '../components/pagination';

const Journeys = () => {
  const [journeys, setJourneys] = React.useState([]);
  const [orderby, setOrderBy] = React.useState('');
  const [limit, setLimit] = React.useState(100);
  const [offset, setOffset] = React.useState(0);
  const [ordering, setOrdering] = React.useState('ASC');

  const toggleOrdering = () => {
    setOrdering(ordering === 'ASC' ? 'DESC' : 'ASC');
  }

  React.useEffect(() => {
    console.log('fetching from:', offset);
    axios
      .get(`http://localhost:3002/journey`, {params: {limit, offset, orderby, ordering}})
      .then((response) => setJourneys(response.data));
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
          <p className="text-left col-span-2 cursor-pointer" onClick={() => {setOrderBy('departure_station_name'); toggleOrdering()}}> Start station </p>
          <p className="text-left col-span-2 cursor-pointer" onClick={() => {setOrderBy('return_station_name'); toggleOrdering()}}> End station </p>
          <p className="text-left cursor-pointer" onClick={() => {setOrderBy('departuredate'); toggleOrdering()}}> Start date </p>
          <p className="text-left cursor-pointer" onClick={() => {setOrderBy('returndate'); toggleOrdering()}}> End date </p>
          <p className="text-left cursor-pointer" onClick={() => {setOrderBy('distance'); toggleOrdering()}}>Distance</p>
          <p className="text-left cursor-pointer" onClick={() => {setOrderBy('duration'); toggleOrdering()}}>Duration</p>
        </li>
      </ul>
      <ul className="journeys">
        {journeys.map((journey: Journey, i: number) => (
          <li className="grid grid-cols-9 p-2 border-b" key={journey.id}>
            <p className="text-left"> {i + 1 + offset}. </p>
            <p className="text-left col-span-2">
              {' '}
              {journey.departure_station_name}
            </p>
            <p className="text-left col-span-2">
              {' '}
              {journey.return_station_name}
            </p>
            <p className="text-left">
              {dayjs(journey.departuredate).format('DD.MM.YYYY')}
            </p>
            <p className="text-left">
              {dayjs(journey.returndate).format('DD.MM.YYYY')}
            </p>
            <p className="text-left">{journey.distance / 1000}km</p>
            <p className="text-left">
              {Math.floor(journey.duration / (60*60*24)) +
                'vrk ' +
                Math.floor(journey.duration % (60*60*24)/(60*60)) +
                'h ' +
                (Math.floor(journey.duration % (60*60)/60)) +
                'min ' +
                (journey.duration % 60)
                }
              s
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Journeys;
