import React, { useState } from 'react';
import { useStations } from '../../contexts/stations-context';
import { postJourney } from '../../services/JourneysService';
import { Journey } from '../../types/journey';
import InputWithLabel from '../input-with-label';
import MapWrapper from '../map-wrapper';
import Searchbar from '../searchbar';
import DateTimePicker from 'react-datetime-picker';
import dayjs from 'dayjs';
import useForm from '../../Hooks/useform';

const defaultJourney = {
  return_station: 1,
  return_station_name: 'Kaivopuisto',
  departure_station: 2,
  departure_station_name: 'Laivasillankatu',
  departuredate: new Date(),
  returndate: '',
  distance: 10,
  duration: 10,
};

const AddJourney = (props: {
  active: boolean;
  handleActivation: { (value: string): void };
}) => {
  const [newJourney, setNewJourney] = useState(defaultJourney);
  const stations = useStations();
  const {handleChange, errors} = useForm();

  const sendStation = () => {
    postJourney({
      ...newJourney,
      departuredate: getFormattedDate(newJourney.departuredate, 0),
      returndate: getFormattedDate(
        newJourney.departuredate,
        newJourney.duration
      ),
    } as Journey);
    setNewJourney(defaultJourney);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  const handleStartDateChange = (dateTime: Date) => {
    setNewJourney({
      ...newJourney,
      departuredate: dateTime,
    });
  };

  const getFormattedDate = (date: Date, offset: number) => {
    return dayjs(date).add(offset, 's').format('YYYY-MM-DDTHH:mm:ss[Z]');
  };

  return (
    <>
      <div
        className="w-full text-center font-bold text-lg border-t-2 border-t-gray-300 mt-2 hover:bg-slate-200 cursor-pointer"
        onClick={() => props.handleActivation('J')}
      >
        Journey
      </div>
      {props.active && (
        <div className="flex flex-wrap justify-between items-start w-full m-2">
          <span className='flex flex-col items-start justify-start pb-1'>
            <label htmlFor={'departure_station'}>Departure station: </label>
            <Searchbar
              searchStringChange={() => ''}
              searchString={newJourney.departure_station_name.toString()}
              stations={stations}
              name="departure_station"
              stationIdChange={handleStationIdChange}
            ></Searchbar>
          </span>  
          <span className='flex flex-col items-start justify-start pb-1'>
            <label htmlFor={'return_station'}>Return station: </label>
            <Searchbar
              searchStringChange={() => ''}
              searchString={newJourney.return_station_name.toString()}
              stations={stations}
              name="return_station"
              stationIdChange={handleStationIdChange}
            ></Searchbar>
          </span>
          <InputWithLabel
            label={'Distance (m)'}
            type={'number'}
            value={newJourney.distance}
            changeFn={(e) => {handleChange(e); handleInputChange(e);}}
            name={'distance'}
          ></InputWithLabel>
          <span className='flex flex-col items-start justify-start pb-1'>
            <label htmlFor={'date'}>Departure time: </label>
            <DateTimePicker
              onChange={(e) => {handleChange({target:{value: e, name: 'date'}}); handleStartDateChange(e);}}
              value={new Date(newJourney.departuredate)}
            ></DateTimePicker>
              {
                errors.date && <h3 className='capitalize text-red-400 max-w-fit'>{errors.name}</h3>
              }
          </span>
          <InputWithLabel
            label={'Duration (s)'}
            type={'number'}
            value={newJourney.duration}
            changeFn={(e) => {handleChange(e); handleInputChange(e);}}
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
        </div>
      )}
    </>
  );
};

export default AddJourney;
