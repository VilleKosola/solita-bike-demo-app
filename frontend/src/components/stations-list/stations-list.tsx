import React from 'react';
import { Station } from '../../types/station';
import StationItem from '../station-item/station-item';

const StationList = (props: { stations: Station[]; offset: number }) => {
  const [active, setActive] = React.useState('');
  return (
    <ul className="stations">
      {props.stations.map((station: Station, i: number) => (
        <StationItem
          data-testid="station-item"
          key={station.id}
          station={station}
          index={i + 1 + props.offset}
          active={active === station.id.toString() || props.stations.length === 1}
          setActive={(id: string) =>
            id === active ? setActive('') : setActive(id)
          }
        />
      ))}
    </ul>
  );
};

export default StationList;
