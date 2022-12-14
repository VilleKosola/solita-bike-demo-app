import _ from 'lodash';
import React from 'react';

interface DurFilterProps {
  minChange: { (value: number): void };
  maxChange: { (value: number): void };
  min: number;
  max: number;
}

const DurFilter = (props: DurFilterProps) => {
  const [minDur, setMinDur] = React.useState({ days: 0, hours: 0, minutes: 0 });
  const [maxDur, setMaxDur] = React.useState({
    days: 100,
    hours: 0,
    minutes: 0,
  });

  const setTime = (
    type: 'min' | 'max',
    time: { days?: number; hours?: number; minutes?: number }
  ) => {
    if (type === 'min') {
      setMinDur(_.assign(minDur, time));
      const timeInSeconds =
        minDur.days * 24 * 60 * 60 +
        minDur.hours * 60 * 60 +
        minDur.minutes * 60;
      props.minChange(timeInSeconds);
      return timeInSeconds;
    } else if (type === 'max') {
      setMaxDur(_.assign(maxDur, time));
      const timeInSeconds =
        maxDur.days * 24 * 60 * 60 +
        maxDur.hours * 60 * 60 +
        maxDur.minutes * 60;
      props.maxChange(timeInSeconds);
      return timeInSeconds;
    }
  };

  return (
    <div
      data-testid="time-filter-parent"
      className="flex items-center justify-center p-3"
    >
      <span>Duration: </span>
      {/* Move inputs and label to component */}
      <input
        type={'number'}
        data-testid="min-days-input"
        className="w-12 pl-1 ml-5 border-gray-500 border-solid border"
        onChange={(e) => setTime('min', { days: Number(e.target.value) })}
        value={minDur.days}
      />
      d
      <input
        type={'number'}
        data-testid="min-hours-input"
        className="w-12 pl-1 ml-5 border-gray-500 border-solid border"
        onChange={(e) => setTime('min', { hours: Number(e.target.value) })}
        value={minDur.hours}
      />
      h
      <input
        type={'number'}
        data-testid="min-minutes-input"
        className="w-12 pl-1 ml-5 border-gray-500 border-solid border"
        onChange={(e) => setTime('min', { minutes: Number(e.target.value) })}
        value={minDur.minutes}
      />
      min -
      <input
        type={'number'}
        data-testid="max-days-input"
        className="w-12 pl-1 ml-5 border-gray-500 border-solid border"
        onChange={(e) => setTime('max', { days: Number(e.target.value) })}
        value={maxDur.days}
      />
      d
      <input
        type={'number'}
        data-testid="max-hours-input"
        className="w-12 pl-1 ml-5 border-gray-500 border-solid border"
        onChange={(e) => setTime('max', { hours: Number(e.target.value) })}
        value={maxDur.hours}
      />
      h
      <input
        type={'number'}
        data-testid="max-minutes-input"
        className="w-12 pl-1 ml-5 border-gray-500 border-solid border"
        onChange={(e) => setTime('max', { minutes: Number(e.target.value) })}
        value={maxDur.minutes}
      />
      min
    </div>
  );
};

export default DurFilter;
