import './App.css';
import Journeys from './pages/journeys';
import {
  BrowserRouter,
  Routes,
  Route,
  redirect,
  Navigate,
} from 'react-router-dom';
import Navigation from './pages/navigation';
import Stations from './pages/stations';
import { useStationsDispatch } from './contexts/stations-context';
import React from 'react';
import { getAllStations } from './services/StationService';
import { Station } from './types/station';
import AppHeader from './components/header';

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
      <AppHeader headerTitle={'Helsinki city bike journeys app'} />
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
