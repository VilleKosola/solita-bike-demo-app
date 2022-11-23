import React from 'react';
import { Station } from '../../types/station';
import LeafletMap from '../map/map';
import { getStationsById } from '../../services/StationService'; 

interface Location {
  x: number,
  y: number,
  name: string,
  id: number
}

function MapWrapper(props: { stationIds: string[] }) {
  const [stations, setStations] = React.useState([] as Location[]);

  React.useEffect(() => {
    if (props.stationIds?.length) {  
      getStationsById(props.stationIds).then((data: Station []) => {
        const s = data.map((st) => {
          return {
            x: st.x_coordinate,
            y: st.y_coordinate,
            name: st.nimi,
            id: st.fid,
          };
        });
        setStations(s);
      });
    }
  }, [props.stationIds]);

  return (
    <LeafletMap locations={stations} />
  );
}

export default MapWrapper;