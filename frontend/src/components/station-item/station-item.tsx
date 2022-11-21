import React from 'react';
import { Station } from '../../types/station';
import LeafletMap from '../map/map';
import StationStats from '../station-stats/station-stats';

const StationItem = (props: {
  station: Station;
  index: number;
  active: boolean;
  setActive: { (value: string): void };
}) => {
  const station = props.station;

  return (
    <>
      <li
        className="grid grid-cols-9 p-2 border-b cursor-pointer hover:bg-gray-200"
        key={station.fid}
        data-testid="station-item"
        onClick={() => props.setActive(station.id.toString())}
      >
        <p className="text-left"> {props.index}. </p>
        <p className="text-left col-span-2"> {station.nimi}</p>
        <p className="text-left col-span-2"> {station.osoite}</p>
        <p className="text-left">{station.city}</p>
        <p className="text-left">{station.operator}</p>
        <p className="text-left">{station.x_coordinate}</p>
        <p className="text-left">{station.y_coordinate}</p>
      </li>
      {props.active && (
        <div>
          <StationStats station={station} ></StationStats>
          <LeafletMap
            locations={[
              {
                x: station.x_coordinate,
                y: station.y_coordinate,
                name: station.nimi,
                id: station.fid,
              },
            ]}
          />
        </div>
      )}
    </>
  );
};

export default StationItem;
