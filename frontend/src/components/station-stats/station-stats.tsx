import React from 'react';
import { getStationStatistics } from '../../services/StationService';
import { StationStatistics } from '../../types/station';

const StationStats = (props: {
  station: StationStatistics;
}) => {
    const [data, setData] = React.useState(props.station)

    React.useEffect(() => {
        getStationStatistics(props.station.id.toString()).then((d) => {
            setData(d)
        });
      }, [props.station]);

  return (
    <div className='grid grid-cols-2'>
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
    </div>
  );
};

export default StationStats;