import { LeafletMouseEvent } from 'leaflet';
import React, { useState } from 'react';
import { useStationsDispatch } from '../../contexts/stations-context';
import { postStation } from '../../services/StationService';
import { Station } from '../../types/station';
import LeafletMap from '../map';

const defaultStation = {
  nimi: '',
  osoite: '',
  city: '',
  x_coordinate: 25,
  y_coordinate: 60,
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewStation({ ...newStation, [event.target.name]: event.target.value });
    console.log(newStation);
  };

  const handleMapChange = (event: LeafletMouseEvent) => {
    setNewStation({
      ...newStation,
      x_coordinate: Number(event.latlng.lng.toFixed(2)),
      y_coordinate: Number(event.latlng.lat.toFixed(2)),
    });
    console.log(newStation);
  };

  return (
    <>
      <input
        type="text"
        name="nimi"
        value={newStation.nimi}
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="osoite"
        value={newStation.osoite}
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="city"
        value={newStation.city}
        onChange={handleChange}
      ></input>

      <input
        type="number"
        name="x_coordinate"
        value={newStation.x_coordinate}
        onChange={handleChange}
      ></input>
      <input
        type="number"
        name="y_coordinate"
        value={newStation.y_coordinate}
        onChange={handleChange}
      ></input>
      <button
        className="border border-gray-500 border-solid p-2"
        onClick={sendStation}
      >
        Add New
      </button>

      <LeafletMap
        locations={[]}
        onClick={handleMapChange}
        enableMarkerAdd={true}
      ></LeafletMap>
    </>
  );
};

export default AddStation;
