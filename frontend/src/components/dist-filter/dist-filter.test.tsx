import { fireEvent, render, screen } from '@testing-library/react';
import DistFilter from './dist-filter';

test('test min callback', () => {
    let val = 0;
    const change = (value: number) => val = value;
    render(
        <DistFilter minChange={change} maxChange={change} min={0} max={1000} />
    );
    const input = screen.getByTestId('min-input');
    fireEvent.change(input, {target: {value: 999}})
    expect(val).toBe(999);
});

test('test max callback', () => {
    let val = 0;
    const change = (value: number) => val = value;
    render(
        <DistFilter minChange={change} maxChange={change} min={0} max={1000} />
    );
    const input = screen.getByTestId('max-input');
    fireEvent.change(input, {target: {value: 999}})
    expect(val).toBe(999);
});