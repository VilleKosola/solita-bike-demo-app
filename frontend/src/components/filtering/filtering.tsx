import React from 'react';

interface FilteringProps {
  offsetChange: { (value: number): void };
  limitChange: { (value: number): void };
  limit: number;
  offset: number;
}

const Filtering = (props: FilteringProps) => {
  const [limit, setLimit] = React.useState(props.limit);
  const [offset, setOffset] = React.useState(props.offset);

  const limitselection = (value: number) => {
    props.limitChange(value);
    setLimit(value);
    props.offsetChange(0);
    setOffset(0);
  };

  return (
    <div data-testid="pagination-parent" className="flex justify-between p-3">
      <div></div>
      {offset > 0 ? (
        <div
          data-testid="offset-previous"
          id="offset-previous"
          className="font-bold rounded-full bg-black text-white w-7 h-7 flex items-center justify-center cursor-pointer"
          onClick={() => {
            props.offsetChange(offset - limit);
            setOffset(offset - limit);
          }}
        >
          {' '}
          <span>{'<'}</span>{' '}
        </div>
      ) : (
        <div></div>
      )}

      <div className="text-center">
        {offset} - {offset + limit}
      </div>

      <div
        data-testid="offset-next"
        className="font-bold rounded-full bg-black text-white w-7 h-7 flex items-center justify-center cursor-pointer"
        onClick={() => {
          props.offsetChange(offset + limit);
          setOffset(offset + limit);
        }}
      >
        {' '}
        {'>'}{' '}
      </div>
      <div>
        <select
          value={limit}
          data-testid="limit-select"
          onChange={(e) => {
            limitselection(Number(e.target.value));
          }}
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={1000}>1000</option>
        </select>
      </div>
    </div>
  );
};

export default Filtering;
