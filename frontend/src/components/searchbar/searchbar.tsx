import React from 'react';
import { Station } from '../../types/station';

interface SearchbarProps {
  searchStringChange: { (value: string): void };
  searchString: string;
  stations: Station[];
}

const Searchbar = (props: SearchbarProps) => {
  const [searchString, setsearchString] = React.useState(props.searchString);
  const [results, setResults] = React.useState([] as JSX.Element[]);

  React.useEffect( () => { 
    const filterFn = (s: Station) => {
      return searchString !== '' && [s.name, s.nimi, s.namn].some(n => n.includes(searchString) && n.toLowerCase() !== searchString.toLowerCase());
    }

    const getData = setTimeout(() => {
      setResults(props.stations.filter(s => filterFn(s)).map(s => (
        <span data-testid="search-item" key={s.id} onClick={(e) => {setsearchString(s.nimi); props.searchStringChange(s.nimi)}}>{s.name}</span>
      )))
    }, 500)
    return () => clearTimeout(getData)

  }, [searchString, props])

  return (
    <div data-testid="searchbar-parent" className="flex relative justify-center searchbar-parent pl-3">
      <div id="myDropdown" className="dropdown-content show">
        <input type="text" value={searchString} placeholder="Search.." id="myInput" onChange={(e) => {setsearchString(e.target.value); props.searchStringChange(e.target.value)}} />
        { results }
      </div>
    </div>
  );
};

export default Searchbar;
