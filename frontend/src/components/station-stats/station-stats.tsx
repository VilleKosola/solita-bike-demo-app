import dayjs from 'dayjs';
import React from 'react';
import { getStationStatistics } from '../../services/StationService';
import { StationStatistics } from '../../types/station';

interface SelectObject {
    name: string;
    from: string;
    to: string;
}

const selections: SelectObject[] = [
    {name: 'All', from:'2018-01-01 00:00', to: '2023-01-01 00:00'},
    {name: 'May 2021', from:'2021-05-01 00:00', to: '2021-06-01 00:00'},
    {name: 'June 2021', from:'2021-06-01 00:00', to: '2021-07-01 00:00'},
    {name: 'July 2021', from:'2021-07-01 00:00', to: '2021-08-01 00:00'},
    {name: 'August 2021', from:'2021-08-01 00:00', to: '2021-08-01 00:00'},
]

const StationStats = (props: {
  station: StationStatistics;
}) => {
    const [data, setData] = React.useState(props.station)
    const [timeFrame, setTimeFrame] = React.useState('All')

    React.useEffect(() => {
        const selection = selections.find(s => s.name === timeFrame) ?? selections[0];
        const from = dayjs(selection.from).format('YYYY-MM-DD');
        const to = dayjs(selection.to).format('YYYY-MM-DD');
        getStationStatistics(props.station.id.toString(), from, to).then((d) => {
            setData(d)
        });
      }, [props.station, timeFrame]);

  return (
    <div className='grid grid-cols-2 relative'>
        <div className='flex flex-col justify-center mx-auto'>
            <p className='font-bold text-center'>Trips starting from</p>
            <p>Count: {data.starting_count}</p>
            <p>Avg distance: {(Number(data.avg_dist_from) / 1000).toFixed(2)}km</p>
            <p className='text-center font-semibold'>Top 5</p>
            <ul>
                { data.starting_from_top?.map((item, i) => 
                    <li key={item.return_station_name}>{i+1}. {item.return_station_name}: {item.numberoftrips}</li>
                )}
            </ul>
        </div>
        <div className='flex flex-col align-middle mx-auto'>
            <p className='font-bold text-center'>Trips ending to</p>
            <p>Count: {data.ending_count}</p>
            <p>Avg distance: {(Number(data.avg_dist_to) / 1000).toFixed(2)}km</p>
            <p className='text-center font-semibold'>Top 5</p>
            <ul>
                { data.ending_to_top?.map((item,i) => 
                    <li key={item.departure_station_name}>{i+1}. {item.departure_station_name}: {item.numberoftrips}</li>
                )}
            </ul>
        </div>
        <div className='absolute right-5'>
            <select
            value={timeFrame}
            className={'border-solid border-1 border-b-slate-600'}
            onChange={(e) => {
                setTimeFrame(e.target.value);
            }}
            >
                {selections.map(s => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                ))}
            </select>
        </div>
    </div>
  );
};

export default StationStats;