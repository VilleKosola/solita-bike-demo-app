export interface Station {
  id: number | string;
  fid: number;
  nimi: string;
  name: string;
  namn: string;
  osoite: string;
  address: string;
  city: string;
  stad: string;
  operator: string;
  capasity: string | number;
  x_coordinate: number;
  y_coordinate: number;
}

export interface StationStatistics {
  id: number | string;
  starting_count?: number;
  ending_count?: number;
  avg_dist_from?: number;
  avg_dist_to?: number;
  starting_from_top?: { return_station_name: string; numberoftrips: string }[];
  ending_to_top?: { departure_station_name: string; numberoftrips: string }[];
}

export interface Location {
  lat: number;
  lng: number;
  name: string;
  color?: string;
  id: string | number;
}
