import { LeafletMouseEvent } from 'leaflet';
import React, { useState } from 'react';
import { useStationsDispatch } from '../../contexts/stations-context';
import { postStation } from '../../services/StationService';
import { Station } from '../../types/station';
import InputWithLabel from '../input-with-label';
import LeafletMap from '../map';

const defaultStation = {
  nimi: '',
  osoite: '',
  city: '',
  x_coordinate: 24.95,
  y_coordinate: 60.21,
  id: '',
} as Station;

const AddStation = (props: {
  active: boolean;
  handleActivation: { (value: string): void };
}) => {
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewStation({
      ...newStation,
      [event.target.name]: event.target.value,
      id: crypto.randomUUID(),
    });
  };

  const handleMapChange = (event: LeafletMouseEvent) => {
    setNewStation({
      ...newStation,
      x_coordinate: Number(event.latlng.lng.toFixed(2)),
      y_coordinate: Number(event.latlng.lat.toFixed(2)),
    });
  };

  return (
    <>
      <div
        className="w-full text-center font-bold text-lg border-t-2 border-t-gray-300 mt-2 hover:bg-slate-200 cursor-pointer"
        onClick={() => props.handleActivation('S')}
      >
        Station
      </div>
      {props.active && (
        <>
          <InputWithLabel
            label={'Name'}
            type={'string'}
            value={newStation.nimi}
            changeFn={handleChange}
            name={'nimi'}
          ></InputWithLabel>
          <InputWithLabel
            label={'Address'}
            type={'string'}
            value={newStation.osoite}
            changeFn={handleChange}
            name={'osoite'}
          ></InputWithLabel>
          <InputWithLabel
            label={'City'}
            type={'string'}
            value={newStation.city}
            changeFn={handleChange}
            name={'city'}
          ></InputWithLabel>
          <InputWithLabel
            label={'Longitude'}
            type={'number'}
            value={newStation.x_coordinate}
            changeFn={handleChange}
            name={'x_coordinate'}
          ></InputWithLabel>
          <InputWithLabel
            label={'Latitude'}
            type={'number'}
            value={newStation.y_coordinate}
            changeFn={handleChange}
            name={'y_coordinate'}
          ></InputWithLabel>
          <button
            className="border border-gray-500 border-solid p-1 m-2"
            onClick={sendStation}
          >
            Add New
          </button>
          <LeafletMap
            locations={[
              {
                x: newStation.x_coordinate,
                y: newStation.y_coordinate,
                name: newStation.nimi,
                id: newStation.id,
              },
            ]}
            onClick={handleMapChange}
            enableMarkerAdd={true}
            enableZoom={true}
          ></LeafletMap>
        </>
      )}
    </>
  );
};

export default AddStation;
