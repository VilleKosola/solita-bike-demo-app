import { useState } from 'react';
import { useStationsDispatch } from '../../contexts/stations-context';
import { postStation } from '../../services/StationService';
import { Station } from '../../types/station';

const defaultStation = {
  nimi: 'aaaaaa',
  osoite: 'asd',
  city: 'adsf',
  x_coordinate: 24.95,
  y_coordinate: 60.21,
} as Station;

const AddStation = () => {
  const [newStation, setNewStation] = useState(defaultStation);
  const dispatch = useStationsDispatch();

  const sendStation = () => {
    postStation(newStation).then((s) =>
      dispatch({
        type: 'create',
        id: s.id,
        stations: s,
      })
    );
    setNewStation(defaultStation);
  };

  return (
    <button
      className="border border-gray-500 border-solid p-2"
      onClick={sendStation}
    >
      Add New
    </button>
  );
};

export default AddStation;
