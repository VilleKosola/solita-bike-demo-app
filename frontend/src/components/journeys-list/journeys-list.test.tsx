import { render, screen } from '@testing-library/react';
import JourneysList from './journeys-list';
import { Journey } from '../../types/journey';

const journeys: Journey[] = [
  {
    id: 396446,
    departuredate: '2021-04-30T21:00:00.000Z',
    returndate: '2021-04-30T21:00:00.000Z',
    departure_station: 91,
    departure_station_name: 'Seurasaari',
    return_station_name: 'Laajalahden aukio',
    return_station: 94,
    distance: 3071,
    duration: 961,
  },
  {
    id: 396449,
    departuredate: '2021-04-30T21:00:00.000Z',
    returndate: '2021-04-30T21:00:00.000Z',
    departure_station: 16,
    departure_station_name: 'Liisanpuistikko',
    return_station_name: 'Marian sairaala',
    return_station: 31,
    distance: 2758,
    duration: 830,
  },
  {
    id: 396443,
    departuredate: '2021-04-30T21:00:00.000Z',
    returndate: '2021-04-30T21:00:00.000Z',
    departure_station: 201,
    departure_station_name: 'Länsisatamankuja',
    return_station_name: 'Kaapelitehdas',
    return_station: 60,
    distance: 626,
    duration: 203,
  },
  {
    id: 396445,
    departuredate: '2021-04-30T21:00:00.000Z',
    returndate: '2021-04-30T21:00:00.000Z',
    departure_station: 1,
    departure_station_name: 'Kaivopuisto',
    return_station_name: 'Kalevankatu',
    return_station: 69,
    distance: 2074,
    duration: 904,
  },
  {
    id: 396447,
    departuredate: '2021-04-30T21:00:00.000Z',
    returndate: '2021-04-30T21:00:00.000Z',
    departure_station: 16,
    departure_station_name: 'Liisanpuistikko',
    return_station_name: 'Marian sairaala',
    return_station: 31,
    distance: 2758,
    duration: 789,
  },
];

test('test journey listing', async () => {
  render(<JourneysList journeys={journeys} offset={0} />);
  const items: HTMLSelectElement[] = await screen.findAllByTestId(
    'journey-item'
  );

  expect(items.length).toBe(5);
  expect(items[0]).toHaveTextContent('Seurasaari');
  expect(items[0]).toHaveTextContent('1.');
  expect(items[0]).toHaveTextContent('Laajalahden aukio');
  expect(items[0]).toHaveTextContent('3.071km');
  expect(items[0]).toHaveTextContent('0vrk 0h 16min 1s');
});
