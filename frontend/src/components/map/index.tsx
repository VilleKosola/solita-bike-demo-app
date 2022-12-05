import { LeafletMouseEvent } from 'leaflet';
import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';

interface Location {
  x: number;
  y: number;
  name: string;
  id: string | number;
}

const MapEventHandler = (props: {
  onClick: { (event: LeafletMouseEvent): void };
}) => {
  const map = useMapEvents({
    click: (e) => {
      map.eachLayer((layer) => {
        const l = layer as unknown as { _latlng: string };
        if (l['_latlng'] !== undefined) {
          layer.remove();
        }
      });
      const { lat, lng } = e.latlng;
      L.marker([lat, lng]).addTo(map);
      props.onClick(e);
    },
  });
  return null;
};

const LeafletMap = (props: {
  locations: Location[];
  onClick: { (event: LeafletMouseEvent): void };
  enableMarkerAdd: boolean;
  enableZoom?: boolean;
}) => {
  const [locations, setLocations] = React.useState([] as Location[]);
  const defLocation = locations.length
    ? locations[0]
    : { x: 24.95, y: 60.21, name: 'placeholder', id: 123 };

  React.useEffect(() => {
    if (props.locations?.length) {
      setLocations(props.locations);
    }
  }, [props.locations]);

  return (
    <MapContainer
      preferCanvas={true}
      center={[defLocation.y, defLocation.x]}
      zoom={10}
      scrollWheelZoom={props.enableZoom}
      style={{ height: '250px', width: '100vw' }}
    >
      {props.enableMarkerAdd && (
        <MapEventHandler onClick={props.onClick}></MapEventHandler>
      )}
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
