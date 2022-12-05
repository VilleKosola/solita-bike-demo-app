import { LeafletMouseEvent } from 'leaflet';
import React from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const myIcon = L.icon({
  iconUrl: `https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png`, //'/src/assets/img/mapmarker.png',
  iconAnchor: [20, 41],
  shadowUrl: `https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png`, //'/src/assets/img/mapmarkershadow.png',
});

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
      L.marker([lat, lng], { icon: myIcon }).addTo(map);
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
  const { locations, enableMarkerAdd, enableZoom } = props;
  // eslint-disable-next-line
  const [map, setMap] = React.useState(null as any);
  const defLocation = locations.length
    ? locations[0]
    : { x: 24.95, y: 60.21, name: 'placeholder', id: 123 };

  React.useEffect(() => {
    if (locations?.length && map) {
      map.eachLayer((layer: L.Layer) => {
        const l = layer as unknown as { _latlng: string };
        if (l['_latlng'] !== undefined) {
          layer.remove();
        }
      });
      locations.forEach((l) => {
        L.marker([l.y, l.x], { icon: myIcon }).addTo(map);
      });
    }
  }, [locations, map]);

  return (
    <MapContainer
      preferCanvas={true}
      center={[defLocation.y, defLocation.x]}
      zoom={10}
      scrollWheelZoom={enableZoom}
      style={{ height: '250px', width: '100vw' }}
      ref={setMap}
    >
      {enableMarkerAdd && (
        <MapEventHandler onClick={props.onClick}></MapEventHandler>
      )}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default LeafletMap;
