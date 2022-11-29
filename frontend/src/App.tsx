import './App.css';
import Journeys from './pages/journeys/journeys';
import {
  BrowserRouter,
  Routes,
  Route,
  redirect,
  Navigate,
} from 'react-router-dom';
import Navigation from './pages/navigation/navigation';
import Stations from './pages/stations/stations';
import { useStationsDispatch } from './contexts/stations-context/StationsContext';
import React from 'react';
import { getAllStations } from './services/StationService';
import { Station } from './types/station';

function App() {
  const dispatch = useStationsDispatch();

  React.useEffect(() => {
    getAllStations({
      limit: 500,
      offset: 0,
      orderby: 'name',
      ordering: 'ASC',
    }).then((data: Station[]) =>
      dispatch({ type: 'set', stations: data, id: 111 })
    );
  }, [dispatch]);

  if (!['/journeys', '/stations'].includes(window.location.pathname)) {
    redirect('/journeys');
  }

  return (
    <BrowserRouter>
      {/* TODO: move to component */}
      <header className="App-header h-10 flex justify-center">
        Helsinki city bike journeys app
      </header>
      <Routes>
        <Route path="*" element={<Navigation />}>
          <Route path="journeys" element={<Journeys />} />
          <Route path="stations" element={<Stations />} />
          <Route path="*" element={<Navigate replace to="/journeys" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
