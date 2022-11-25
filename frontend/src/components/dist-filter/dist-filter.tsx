import React from 'react';

interface DistFilterProps {
  minChange: { (value: number): void };
  maxChange: { (value: number): void };
  min: number;
  max: number;
}

const DistFilter = (props: DistFilterProps) => {
  const [min, setMin] = React.useState(Math.floor(props.min));
  const [max, setMax] = React.useState(Math.floor(props.max));

  // const limitselection = (value: number) => {
  //   props.limitChange(value);
  //   setLimit(value);
  //   props.offsetChange(0);
  //   setOffset(0);
  // };

  return (
    <div data-testid="time-filter-parent" className="flex align-middle justify-center p-3">
      <span>Distance: </span>
      <input type={'number'} className="w-12 pl-1 ml-5 border-gray-500 border-solid border" onChange={(e) => {setMin(Number(e.target.value)); props.minChange(Number(e.target.value))}} value={min} />km
      -
      <input type={'number'} className="w-12 pl-1 ml-5 border-gray-500 border-solid border" onChange={(e) => {setMax(Number(e.target.value)); props.maxChange(Number(e.target.value))}} value={max} />km
    </div>
  );
};

export default DistFilter;
