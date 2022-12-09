import { Station } from '../types/station';
import { getParams } from './helperService';
import { baseUrl } from '../globals';

const getAllStations = async (p: {
  limit: number;
  offset: number;
  orderby: string;
  ordering: string;
  stationName?: string;
}) => {
  try {
    const response = fetch(`${baseUrl}/stations?` + getParams(p));
    return (await response).json();
  } catch (error) {
    return [];
  }
};

const getStationsById = async (p: string[]) => {
  const body = JSON.stringify(p);
  try {
    const response = fetch(`${baseUrl}/stations`, {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return (await response).json();
  } catch (error) {
    return [];
  }
};

const postStation = async (station: Station) => {
  const body = JSON.stringify(station);
  try {
    const response = fetch(`${baseUrl}/station`, {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return (await response).json();
  } catch (error) {
    return [];
  }
};

const deleteStation = async (id: number | string) => {
  try {
    const response = fetch(`${baseUrl}/station/${id}`, {
      method: 'DELETE',
    });
    return (await response).json();
  } catch (error) {
    return [];
  }
};

const getStationStatistics = async (id: string, from: string, to: string) => {
  try {
    const response = fetch(
      `${baseUrl}/station/stats/${id}?` + getParams({ from, to })
    );
    return (await response).json();
  } catch (error) {
    return [];
  }
};

export {
  getAllStations,
  getStationsById,
  getStationStatistics,
  postStation,
  deleteStation,
};
