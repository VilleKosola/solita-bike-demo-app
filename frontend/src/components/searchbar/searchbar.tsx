import React from 'react';
import { getAllStations } from '../../services/StationService';
import { Station } from '../../types/station';

interface SearchbarProps {
  searchStringChange: { (value: string): void };
  searchString: string;
}

const Searchbar = (props: SearchbarProps) => {
  const [searchString, setsearchString] = React.useState(props.searchString);
  const [stations, setStations] = React.useState([] as Station[]);
  const [results, setResults] = React.useState([] as JSX.Element[]);

  const filterFn = (s: Station) => {
    return searchString !== '' && [s.name, s.nimi, s.namn].some(n => n.includes(searchString) && n.toLowerCase() !== searchString.toLowerCase());
  }

  React.useEffect( () => { 
        getAllStations({ limit:500, offset: 0, orderby: 'name', ordering: 'ASC' }).then((data) =>
          setStations(data)
        );
  }, [])

  React.useEffect( () => { 
    setResults(stations.filter(s => filterFn(s)).map(s => (
      <a key={s.id} onClick={(e) => setsearchString(s.nimi)}>{s.name}</a>
    )))
  }, [searchString])

  return (
    <div data-testid="time-filter-parent" className="flex relative justify-center time-filter-parent pl-3">
      <div id="myDropdown" className="dropdown-content show">
        <input type="text" value={searchString} placeholder="Search.." id="myInput" onChange={(e) => {setsearchString(e.target.value); props.searchStringChange(e.target.value)}} />
        { results }
      </div>
    </div>
  );
};

export default Searchbar;
