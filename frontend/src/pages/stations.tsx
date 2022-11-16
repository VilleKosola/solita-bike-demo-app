import React from 'react';
import { Station } from '../types/station';
import Pagination from '../components/pagination';
import { getAllStations } from '../services/StationService';
import StationList from '../components/stations-list';

const Stations = () => {
  const [stations, setStations] = React.useState([] as Station[]);
  const [orderby, setOrderBy] = React.useState('nimi');
  const [limit, setLimit] = React.useState(100);
  const [offset, setOffset] = React.useState(0);
  const [ordering, setOrdering] = React.useState('ASC');

  const toggleOrdering = () => {
    setOrdering(ordering === 'ASC' ? 'DESC' : 'ASC');
  };

  React.useEffect(() => {
    getAllStations({ limit, offset, orderby, ordering }).then((data) =>
      setStations(data)
    );
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
          <p
            className="text-left col-span-2 cursor-pointer"
            onClick={() => {
              setOrderBy('nimi');
              toggleOrdering();
            }}
          >
            {' '}
            Name{' '}
          </p>
          <p
            className="text-left col-span-2 cursor-pointer"
            onClick={() => {
              setOrderBy('osoite');
              toggleOrdering();
            }}
          >
            {' '}
            Address{' '}
          </p>
          <p
            className="text-left cursor-pointer"
            onClick={() => {
              setOrderBy('city');
              toggleOrdering();
            }}
          >
            {' '}
            City{' '}
          </p>
          <p
            className="text-left cursor-pointer"
            onClick={() => {
              setOrderBy('operator');
              toggleOrdering();
            }}
          >
            {' '}
            Operator{' '}
          </p>
          <p
            className="text-left cursor-pointer"
            onClick={() => {
              setOrderBy('x_coordinate');
              toggleOrdering();
            }}
          >
            {' '}
            X-coordinate{' '}
          </p>
          <p
            className="text-left cursor-pointer"
            onClick={() => {
              setOrderBy('y_coordinate');
              toggleOrdering();
            }}
          >
            {' '}
            Y-coordinate{' '}
          </p>
        </li>
      </ul>
      <StationList stations={stations} offset={offset} />
    </div>
  );
};

export default Stations;
