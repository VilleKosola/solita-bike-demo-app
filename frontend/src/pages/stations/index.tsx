import React from 'react';
import Pagination from '../../components/pagination';
import { getAllStations } from '../../services/StationService';
import StationList from '../../components/stations-list';
import Searchbar from '../../components/searchbar';
import {
  useStations,
  useStationsDispatch,
} from '../../contexts/stations-context';

const Stations = () => {
  const [orderby, setOrderBy] = React.useState('nimi');
  const [limit, setLimit] = React.useState(100);
  const [offset, setOffset] = React.useState(0);
  const [ordering, setOrdering] = React.useState('ASC');
  const [stationName, setStationName] = React.useState('');
  const stations = useStations();
  const dispatch = useStationsDispatch();

  const toggleOrdering = () => {
    setOrdering(ordering === 'ASC' ? 'DESC' : 'ASC');
  };

  React.useEffect(() => {
    getAllStations({ limit, offset, orderby, ordering, stationName }).then(
      (data) => dispatch({ type: 'set', stations: data, id: 111 })
    );
  }, [orderby, limit, offset, ordering, stationName, dispatch]);

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center">
        <Searchbar
          searchStringChange={setStationName}
          searchString={stationName}
          stations={stations}
          stationIdChange={() => ''}
        ></Searchbar>
        <Pagination
          limit={limit}
          offset={offset}
          offsetChange={(value: number) => setOffset(value)}
          limitChange={(value: number) => setLimit(value)}
        />
      </div>
      <ul className="journeys bg-slate-300 font-bold">
        <li className="grid grid-cols-10 p-2 border-b" key={'header'}>
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
          <p className="text-right"> Actions </p>
        </li>
      </ul>
      <StationList stations={stations} offset={offset} />
    </div>
  );
};

export default Stations;
