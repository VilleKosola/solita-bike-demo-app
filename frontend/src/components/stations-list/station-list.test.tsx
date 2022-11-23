import { render, screen } from '@testing-library/react';
import StationList from './stations-list';
import { Station } from '../../types/station';

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
  {
    id: 539,
    fid: 22,
    nimi: 'Aalto-yliopisto (M), Tietot',
    name: 'Aalto University (M), Tietotie',
    namn: 'Aalto-universitetet (M),',
    osoite: 'Tietotie 4',
    address: 'Datavägen 4',
    city: 'Espoo',
    stad: 'Esbo',
    operator: 'CityBike Finland',
    capasity: 20,
    x_coordinate: 24.820099,
    y_coordinate: 60.184986,
  },
  {
    id: 258,
    fid: 320,
    nimi: 'Abraham Wetterin tie',
    name: 'Abraham Wetterin tie',
    namn: 'Abraham Wetters väg',
    osoite: 'Sorvaajankatu 1',
    address: 'Svarvaregatan 1',
    city: ' ',
    stad: ' ',
    operator: ' ',
    capasity: 16,
    x_coordinate: 25.042654,
    y_coordinate: 60.19277,
  },
  {
    id: 254,
    fid: 316,
    nimi: 'Agnetankuja',
    name: 'Agnetankuja',
    namn: 'Agnetagränden',
    osoite: 'Laivalahdenkaari 24',
    address: 'Båtviksbågen 24',
    city: ' ',
    stad: ' ',
    operator: ' ',
    capasity: 16,
    x_coordinate: 25.0365,
    y_coordinate: 60.18721,
  },
  {
    id: 241,
    fid: 303,
    nimi: 'Agronominkatu',
    name: 'Agronominkatu',
    namn: 'Agronomgatan',
    osoite: 'Latokartanontori',
    address: 'Ladugårdstorget',
    city: ' ',
    stad: ' ',
    operator: ' ',
    capasity: 24,
    x_coordinate: 25.032858,
    y_coordinate: 60.234055,
  },
];

test('test station listing', async () => {
  render(<StationList stations={stations} offset={0} />);
  const items: HTMLSelectElement[] = await screen.findAllByTestId(
    'station-item'
  );

  expect(items.length).toBe(5);
  expect(items[0]).toHaveTextContent('Aalto-yliopisto (M), Korkea');
  expect(items[0]).toHaveTextContent('1.');
  expect(items[0]).toHaveTextContent('Otaniementie 10');
  expect(items[0]).toHaveTextContent('Espoo');
  expect(items[0]).toHaveTextContent('60.18431');
  expect(items[0]).toHaveTextContent('24.826672');
});