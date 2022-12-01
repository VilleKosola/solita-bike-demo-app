import { render, screen } from '@testing-library/react';
import { Station } from '../../types/station';
import Searchbar from '.';

const stations: Station[] = [
  {
    id: 541,
    fid: 23,
    nimi: 'Aalto-yliopisto (M), Korkea',
    name: 'Aalto University (M), Korkeakoulua',
    namn: 'Aalto-universitetet (M),',
    osoite: 'Otaniementie 10',
    address: 'Otnäsvägen 10',
    city: 'Espoo',
    stad: 'Esbo',
    operator: 'CityBike Finland',
    capasity: 42,
    x_coordinate: 24.826672,
    y_coordinate: 60.18431,
  },
];

test('test search string renders only one result', async () => {
  render(
    <Searchbar
      searchStringChange={() => ''}
      searchString={'Aalto-yliopisto (M), Ko'}
      stations={stations}
    />
  );
  const items: HTMLElement[] = await screen.findAllByTestId('search-item');

  expect(items.length).toBe(1);
});
