import { fireEvent, render, screen } from '@testing-library/react';
import DurFilter from '.';

test('test min duration minutes callback', () => {
  let val = 0;
  const change = (value: number) => (val = value);
  render(
    <DurFilter minChange={change} maxChange={change} min={0} max={1000} />
  );
  const input = screen.getByTestId('min-minutes-input');
  fireEvent.change(input, { target: { value: 1 } });
  expect(val).toBe(60);
});

test('test max duration days callback', () => {
  let val = 0;
  const change = (value: number) => (val = value);
  render(
    <DurFilter minChange={change} maxChange={change} min={0} max={1000} />
  );
  const input = screen.getByTestId('max-days-input');
  fireEvent.change(input, { target: { value: 1 } });
  expect(val).toBe(24 * 60 * 60);
});
