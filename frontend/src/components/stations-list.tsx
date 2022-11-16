import { Station } from '../types/station';
import StationItem from './station-item';

const StationList = (props: { stations: Station[]; offset: number }) => {
  return (
    <ul className="stations">
      {props.stations.map((station: Station, i: number) => (
        <StationItem
          data-testid="station-item"
          key={station.id}
          station={station}
          index={i + 1 + props.offset}
        />
      ))}
    </ul>
  );
};

export default StationList;
