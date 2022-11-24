import React from 'react';
import { Journey } from '../../types/journey';
import Pagination from '../../components/pagination/pagination';
import { getAllJourneys } from '../../services/JourneysService';
import JourneysList from '../../components/journeys-list/journeys-list';

const Journeys = () => {
  const [journeys, setJourneys] = React.useState([] as Journey[]);
  const [orderby, setOrderBy] = React.useState('');
  const [limit, setLimit] = React.useState(100);
  const [offset, setOffset] = React.useState(0);
  const [ordering, setOrdering] = React.useState('ASC');

  const [endStationName, setEndStationName] = React.useState('');
  const [startStationName, setStartStationName] = React.useState('');
  const [from, setFrom] = React.useState('2018-01-01 00:00');
  const [to, setTo] = React.useState('2022-01-01 00:00');
  const [minDist, setMinDist] = React.useState(0);
  const [maxDist, setMaxDist] = React.useState(99999999999);
  const [minDur, setMinDur] = React.useState(0);
  const [maxDur, setMaxDur] = React.useState(99999999999);

  const toggleOrdering = () => {
    setOrdering(ordering === 'ASC' ? 'DESC' : 'ASC');
  };

  React.useEffect(() => {
    getAllJourneys({ limit, offset, orderby, ordering, endStationName, startStationName, from, to, minDist, maxDist, minDur, maxDur }).then((data) =>
      setJourneys(data)
    );
  }, [orderby, limit, offset, ordering, endStationName, startStationName, from, to, minDist, maxDist, minDur, maxDur]);

  return (
    <div>
      <div>

      </div>
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
              setOrderBy('departure_station_name');
              toggleOrdering();
            }}
          >
            {' '}
            Start station{' '}
          </p>
          <p
            className="text-left col-span-2 cursor-pointer"
            onClick={() => {
              setOrderBy('return_station_name');
              toggleOrdering();
            }}
          >
            {' '}
            End station{' '}
          </p>
          <p
            className="text-left cursor-pointer"
            onClick={() => {
              setOrderBy('departuredate');
              toggleOrdering();
            }}
          >
            {' '}
            Start date{' '}
          </p>
          <p
            className="text-left cursor-pointer"
            onClick={() => {
              setOrderBy('returndate');
              toggleOrdering();
            }}
          >
            {' '}
            End date{' '}
          </p>
          <p
            className="text-left cursor-pointer"
            onClick={() => {
              setOrderBy('distance');
              toggleOrdering();
            }}
          >
            Distance
          </p>
          <p
            className="text-left cursor-pointer"
            onClick={() => {
              setOrderBy('duration');
              toggleOrdering();
            }}
          >
            Duration
          </p>
        </li>
      </ul>
      <JourneysList journeys={journeys} offset={offset} />
      {/* <ul className="journeys">
        {journeys.map((journey: Journey, i: number) => (
          <JourneyItem key={journey.id} journey={journey} index={i+1+offset} />
        ))}
      </ul> */}
    </div>
  );
};

export default Journeys;
