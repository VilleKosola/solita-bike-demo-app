import { useStationsDispatch } from '../../contexts/stations-context';
import { deleteStation } from '../../services/StationService';
import { Station } from '../../types/station';
import LeafletMap from '../map';
import StationStats from '../station-stats';

const StationItem = (props: {
  station: Station;
  index: number;
  active: boolean;
  setActive: { (value: string): void };
}) => {
  const station = props.station;

  const dispatch = useStationsDispatch();

  const removeStation = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteStation(station.id).then((s) =>
      dispatch({
        type: 'delete',
        id: station.id,
        stations: s,
      })
    );
  };

  return (
    <>
      <li
        className="grid grid-cols-10 p-2 border-b cursor-pointer hover:bg-gray-200"
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
        {!station.fid ? (
          <p className="flex justify-end items-center">
            <button
              onClick={removeStation}
              className="cursor-pointer border border-solid border-l-gray-400"
            >
              Delete
            </button>
          </p>
        ) : (
          <p></p>
        )}
      </li>
      {props.active && (
        <div>
          <StationStats station={station}></StationStats>
          <LeafletMap
            locations={[
              {
                x: station.x_coordinate,
                y: station.y_coordinate,
                name: station.nimi,
                id: station.fid,
              },
            ]}
            onClick={() => ''}
            enableMarkerAdd={false}
          />
        </div>
      )}
    </>
  );
};

export default StationItem;
