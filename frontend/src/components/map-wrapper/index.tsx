import React from 'react';
import { Station } from '../../types/station';
import LeafletMap from '../map';
import { getStationsById } from '../../services/StationService';

interface Location {
  x: number;
  y: number;
  name: string;
  id: number;
  color: string;
}

function MapWrapper(props: { stationIds: string[] }) {
  const [stations, setStations] = React.useState([] as Location[]);

  React.useEffect(() => {
    if (props.stationIds?.length) {
      getStationsById(props.stationIds).then((data: Station[]) => {
        const s = data.map((st, i) => {
          return {
            x: st.x_coordinate,
            y: st.y_coordinate,
            name: st.nimi,
            id: st.fid,
            color: i === 0 ? 'green' : 'red',
          };
        });
        setStations(s);
      });
    }
  }, [props.stationIds]);

  return (
    <LeafletMap
      locations={stations}
      onClick={() => ''}
      enableMarkerAdd={false}
    />
  );
}

export default MapWrapper;
