import React from 'react';
import { Journey } from '../../types/journey';
import Pagination from '../../components/pagination/pagination';
import { getAllJourneys } from '../../services/JourneysService';
import JourneysList from '../../components/journeys-list/journeys-list';
import TimeFilter from '../../components/time-filter/time-filter';
import DistFilter from '../../components/dist-filter/dist-filter';
import DurFilter from '../../components/dur-filter/dur-filter';
import Searchbar from '../../components/searchbar/searchbar';

const Journeys = () => {
  const [journeys, setJourneys] = React.useState([] as Journey[]);
  const [orderby, setOrderBy] = React.useState('');
  const [limit, setLimit] = React.useState(100);
  const [offset, setOffset] = React.useState(0);
  const [ordering, setOrdering] = React.useState('ASC');

  const [stationName, setStationName] = React.useState('');
  // const [startStationName, setStartStationName] = React.useState('');
  const [from, setFrom] = React.useState(new Date('2021-04-01 00:00'));
  const [to, setTo] = React.useState(new Date('2021-09-01 00:00'));
  const [minDist, setMinDist] = React.useState(0);
  const [maxDist, setMaxDist] = React.useState(100);
  const [minDur, setMinDur] = React.useState(0);
  const [maxDur, setMaxDur] = React.useState(1000000);

  const toggleOrdering = () => {
    setOrdering(ordering === 'ASC' ? 'DESC' : 'ASC');
  };

  React.useEffect(() => {
    const getData = setTimeout(() => {
      getAllJourneys({ limit, offset, orderby, ordering, endStationName: stationName, startStationName: stationName, from: from.toISOString(), to: to.toISOString(), minDist:minDist*1000, maxDist: maxDist*1000, minDur, maxDur }).then((data) =>
        setJourneys(data)
      )}, 500)

    return () => clearTimeout(getData)
  }, [orderby, limit, offset, ordering, stationName, from, to, minDist, maxDist, minDur, maxDur]);

  return (
    <div>
      <div className='flex flex-wrap justify-between items-center'>
        <TimeFilter fromChange={setFrom} toChange={setTo} from={from} to={to}></TimeFilter>
        <DistFilter minChange={setMinDist} maxChange={setMaxDist} min={minDist} max={maxDist} ></DistFilter>
        <DurFilter minChange={setMinDur} maxChange={setMaxDur} min={minDur} max={maxDur}></DurFilter>
      </div>
      <div className='flex flex-wrap justify-between items-center'>
        <Searchbar searchStringChange={setStationName} searchString={stationName} ></Searchbar>
        <Pagination
          limit={limit}
          offset={offset}
          offsetChange={(value: number) => setOffset(value)}
          limitChange={(value: number) => setLimit(value)}
        />
      </div>
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
