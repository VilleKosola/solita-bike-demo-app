import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface Location {
  x: number;
  y: number;
  name: string;
  id: string | number;
}

const LeafletMap = (props: { locations: Location[] }) => {
  const [locations, setLocations] = React.useState([
    props.locations[0] ?? { x: 24.95, y: 60.21, name: 'placeholder', id: 123 },
  ] as Location[]);

  React.useEffect(() => {
    if (props.locations?.length) {
      setLocations(props.locations);
    }
  }, [props.locations]);

  return (
    <MapContainer
      preferCanvas={true}
      center={[locations[0].y, locations[0].x]}
      zoom={10}
      scrollWheelZoom={false}
      style={{ height: '250px', width: '100vw' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((l) => (
        <Marker position={[l.y, l.x]} key={l.id}>
          <Popup>{l.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
