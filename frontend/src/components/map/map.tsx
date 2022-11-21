import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface Location {
  x: number;
  y: number;
  name: string;
  id: string | number;
}

const LeafletMap = (props: { locations: Location[] }) => {
  const il = props.locations[0] ?? {x: 24, y: 60, name: 'placeholder', id: 123};
  return (
    <MapContainer
      preferCanvas={true}
      center={[il.y, il.x]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '250px', width: '100vw' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.locations.map((l) => (
        <Marker position={[l.y, l.x]} key={l.id}>
          <Popup>{l.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
