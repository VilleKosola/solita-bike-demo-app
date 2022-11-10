import React from 'react';
import './App.css';
import Journeys from './components/journeys';

function App() {
  const [limit, setLimit] = React.useState(100);
  const [offset, setOffset] = React.useState(0);
  const [orderby, setOrderBy] = React.useState('');

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className='flex justify-evenly'>
        <div className='font-bold rounded-full bg-black text-white w-7 h-7 flex items-center justify-center cursor-pointer' onClick={() => setOffset(offset-limit)}> <span>{'<'}</span> </div>
        <div>
          <select value={limit} onChange={(e) => {setLimit(Number(e.target.value)); setOffset(Math.floor(offset/Number(e.target.value)))}}>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={1000}>1000</option>
          </select>
        </div>
        <div className='font-bold rounded-full bg-black text-white w-7 h-7 flex items-center justify-center cursor-pointer' onClick={() => setOffset(offset+limit)}> {'>'} </div>
      </div>
      <Journeys offset={offset} limit={limit} />
    </div>
  );
}

export default App;
