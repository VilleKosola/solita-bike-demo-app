import { render, screen } from '@testing-library/react';
import { Station } from '../../types/station';
import Searchbar from './searchbar';

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
]

test('test search string renders only one result', async () => {
  render(
    <Searchbar searchStringChange={() => ''} searchString={'Aalto-yliopisto (M), Ko'} stations={stations}    />
  );
  const items: HTMLElement[] = await screen.findAllByTestId(
    'search-item'
  );

  expect(items.length).toBe(1);
});

// test('test previous button exists if offset is > 0', () => {
//   render(
//     <Pagination
//       offsetChange={() => ''}
//       limitChange={() => ''}
//       limit={100}
//       offset={100}
//     />
//   );
//   const parent = screen.getByTestId('pagination-parent');
//   expect(parent.querySelector('#offset-previous')).toBeInTheDocument();
// });

// test('test pagination limits', () => {
//   render(
//     <Pagination
//       offsetChange={() => ''}
//       limitChange={() => ''}
//       limit={100}
//       offset={0}
//     />
//   );
//   const limitSelect: HTMLSelectElement = screen.getByTestId('limit-select');

//   expect(limitSelect.options.length).toBe(4);
// });

export{}