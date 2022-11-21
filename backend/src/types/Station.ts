export interface StationStatistics {
    id: number;
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

    starting_count?: number;
    ending_count?: number;
    avg_dist_from?: number;
    avg_dist_to?: number;
    starting_from_top?: Station[];
    ending_to_top?: Station[];
}

export interface Station {
    id: number;
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