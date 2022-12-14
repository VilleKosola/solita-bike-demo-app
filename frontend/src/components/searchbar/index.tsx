import React from 'react';
import { Station } from '../../types/station';

interface SearchbarProps {
  searchStringChange: { (value: string): void };
  stationIdChange: { (name: string, value: number | string): void };
  searchString: string;
  stations: Station[];
  name?: string;
}

const Searchbar = (props: SearchbarProps) => {
  const [searchString, setSearchString] = React.useState(props.searchString);
  const [results, setResults] = React.useState([] as Station[]);

  React.useEffect(() => {
    const filterFn = (s: Station) => {
      return (
        searchString !== '' &&
        [s.name, s.nimi, s.namn].some(
          (n) =>
            n?.toLowerCase().includes(searchString.toLowerCase()) &&
            n?.toLowerCase() !== searchString.toLowerCase()
        )
      );
    };

    const getData = setTimeout(() => {
      setResults(props.stations.filter((s) => filterFn(s)));
    }, 500);
    return () => clearTimeout(getData);
  }, [searchString, props]);

  return (
    <div
      data-testid="searchbar-parent"
      className="flex relative searchbar-parent"
    >
      <div id="myDropdown" className="dropdown-content show">
        <input
          type="text"
          value={searchString}
          placeholder="Search.."
          id={props.name}
          className="searchbar"
          onChange={(e) => {
            setSearchString(e.target.value);
            props.searchStringChange(e.target.value);
          }}
        />
        {results.map((s) => (
          <span
            data-testid="search-item"
            aria-roledescription="Clickable search bar result list item"
            key={s.id}
            onClick={(e) => {
              setSearchString(s.nimi);
              props.searchStringChange(s.nimi);
              props.stationIdChange(props.name || '', s.id);
            }}
          >
            {s.nimi}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Searchbar;
