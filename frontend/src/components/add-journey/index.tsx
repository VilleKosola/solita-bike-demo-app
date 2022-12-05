import React, { useState } from 'react';
import { useStations } from '../../contexts/stations-context';
import { postJourney } from '../../services/JourneysService';
import { Journey } from '../../types/journey';
import InputWithLabel from '../input-with-label';
import MapWrapper from '../map-wrapper';
import Searchbar from '../searchbar';

const defaultJourney = {
  return_station: 1,
  return_station_name: 'Kaivopuisto',
  departure_station: 2,
  departure_station_name: 'Laivasillankatu',
  departuredate: '',
  returndate: '',
  distance: 10,
  duration: 10,
} as Journey;

const AddJourney = () => {
  const [newJourney, setNewJourney] = useState(defaultJourney);
  const stations = useStations();

  const sendStation = () => {
    postJourney(newJourney);
    setNewJourney(defaultJourney);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewJourney({
      ...newJourney,
      [event.target.name]: event.target.value,
    });
  };
  const handleStationIdChange = (name: string, value: string | number) => {
    setNewJourney({
      ...newJourney,
      [name]: value,
    });
  };

  return (
    <>
      <div className="w-full text-center font-bold text-lg border-t-2 border-t-gray-300">
        Journey
      </div>
      <Searchbar
        searchStringChange={() => ''}
        searchString={newJourney.departure_station_name.toString()}
        stations={stations}
        name="departure_station"
        stationIdChange={handleStationIdChange}
      ></Searchbar>
      <Searchbar
        searchStringChange={() => ''}
        searchString={newJourney.return_station_name.toString()}
        stations={stations}
        name="return_station"
        stationIdChange={handleStationIdChange}
      ></Searchbar>
      <InputWithLabel
        label={'Distance'}
        type={'number'}
        value={newJourney.distance}
        changeFn={handleChange}
        name={'distance'}
      ></InputWithLabel>
      <InputWithLabel
        label={'Duration'}
        type={'number'}
        value={newJourney.duration}
        changeFn={handleChange}
        name={'duration'}
      ></InputWithLabel>
      <button
        className="border border-gray-500 border-solid p-1 m-2"
        onClick={sendStation}
      >
        Add New
      </button>

      <MapWrapper
        stationIds={[
          newJourney.departure_station.toString(),
          newJourney.return_station.toString(),
        ]}
      ></MapWrapper>
    </>
  );
};

export default AddJourney;
