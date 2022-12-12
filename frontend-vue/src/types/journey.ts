export interface Journey {
  id: string | number;
  departuredate: string;
  returndate: string;
  return_station_name: string;
  departure_station_name: string;
  departure_station: number;
  return_station: number;
  distance: number;
  duration: number;
}
