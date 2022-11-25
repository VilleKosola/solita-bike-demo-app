import React from 'react';
import DateTimePicker from 'react-datetime-picker'

interface TimeFilterProps {
  fromChange: { (value: Date): void };
  toChange: { (value: Date): void };
  from: Date;
  to: Date;
  showDate: boolean;
  showTime: boolean;
}

const TimeFilter = (props: TimeFilterProps) => {
  const [from, setFrom] = React.useState(props.from);
  const [to, setTo] = React.useState(props.to);

  return (
    <div data-testid="time-filter-parent" className="flex justify-center p-3">
      <DateTimePicker disableClock={props.showTime} disableCalendar={props.showDate} onChange={(value) => {setFrom(value); props.fromChange(value)}} value={from} />
      -
      <DateTimePicker disableClock={props.showTime} disableCalendar={props.showDate} onChange={(value) => {setTo(value);props.toChange(value)}} value={to} />
    </div>
  );
};

export default TimeFilter;
