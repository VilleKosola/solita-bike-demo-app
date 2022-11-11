import React from 'react';
import './App.css';
import Journeys from './pages/journeys';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './pages/navigation';
import Stations from './pages/stations';

function App() {
  const [limit, setLimit] = React.useState(100);
  const [offset, setOffset] = React.useState(0);
  const [orderby, setOrderBy] = React.useState('');

  return (
    <BrowserRouter>      
      <header className="App-header h-10 flex justify-center">
        Helsinki city bike journeys app
      </header>
      <div className='flex justify-evenly p-3'>
        {offset > 0 ?     
          <div className='font-bold rounded-full bg-black text-white w-7 h-7 flex items-center justify-center cursor-pointer' onClick={() => setOffset(offset-limit)}> <span>{'<'}</span> </div>
          :
          <div></div>
        }
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
      <Routes>
      {/* offsetChange={(value: number) => setOffset(value)} limitChange={(value: number) => setLimit(value)} orderbyChange={(value: string) => setOrderBy(value)} */}
        <Route path="*" element={<Navigation />}>
          <Route path="journeys" element={<Journeys offset={offset} limit={limit}/>} />
          <Route path="stations" element={<Stations  offset={offset} limit={limit}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
