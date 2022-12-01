import React from 'react';
import DatePicker from 'react-date-picker';

interface TimeFilterProps {
  fromChange: { (value: Date): void };
  toChange: { (value: Date): void };
  from: Date;
  to: Date;
}

const TimeFilter = (props: TimeFilterProps) => {
  const [from, setFrom] = React.useState(props.from);
  const [to, setTo] = React.useState(props.to);

  return (
    <div data-testid="time-filter-parent" className="flex justify-center p-3">
      <DatePicker
        onChange={(value: Date) => {
          setFrom(value);
          props.fromChange(value);
        }}
        value={from}
      />
      -
      <DatePicker
        onChange={(value: Date) => {
          setTo(value);
          props.toChange(value);
        }}
        value={to}
      />
    </div>
  );
};

export default TimeFilter;
