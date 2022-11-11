import './App.css';
import Journeys from './pages/journeys';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './pages/navigation';
import Stations from './pages/stations';

function App() {
  return (
    <BrowserRouter>
      <header className="App-header h-10 flex justify-center">
        Helsinki city bike journeys app
      </header>

      <Routes>
        <Route path="*" element={<Navigation />}>
          <Route path="journeys" element={<Journeys />} />
          <Route
            path="stations"
            element={<Stations/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
