import dayjs from 'dayjs';
import { Journey } from '../types/journey';

const JourneyItem = (props: { journey: Journey; index: number }) => {
  const journey = props.journey;
  return (
    <li
      className="grid grid-cols-9 p-2 border-b"
      key={journey.id}
      data-testid="journey-item"
    >
      <p className="text-left"> {props.index}. </p>
      <p className="text-left col-span-2"> {journey.departure_station_name}</p>
      <p className="text-left col-span-2"> {journey.return_station_name}</p>
      <p className="text-left">
        {dayjs(journey.departuredate).format('DD.MM.YYYY')}
      </p>
      <p className="text-left">
        {dayjs(journey.returndate).format('DD.MM.YYYY')}
      </p>
      <p className="text-left">{journey.distance / 1000}km</p>
      <p className="text-left">
        {Math.floor(journey.duration / (60 * 60 * 24)) +
          'vrk ' +
          Math.floor((journey.duration % (60 * 60 * 24)) / (60 * 60)) +
          'h ' +
          Math.floor((journey.duration % (60 * 60)) / 60) +
          'min ' +
          (journey.duration % 60)}
        s
      </p>
    </li>
  );
};

export default JourneyItem;
