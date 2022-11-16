import { Station } from '../types/station';

const StationItem = (props: { station: Station; index: number }) => {
  const station = props.station;

  return (
    <li className="grid grid-cols-9 p-2 border-b" key={station.fid} data-testid="station-item">
      <p className="text-left"> {props.index}. </p>
      <p className="text-left col-span-2"> {station.nimi}</p>
      <p className="text-left col-span-2"> {station.osoite}</p>
      <p className="text-left">{station.city}</p>
      <p className="text-left">{station.operator}</p>
      <p className="text-left">{station.x_coordinate}</p>
      <p className="text-left">{station.y_coordinate}</p>
    </li>
  );
};

export default StationItem;
