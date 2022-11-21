import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Two link buttons', () => {
  render(<App />);
  const link1 = screen.getByText('Journeys');
  const link2 = screen.getByText(/Stations/i);
  expect(link2).toBeInTheDocument();
  expect(link1).toBeInTheDocument();
});
