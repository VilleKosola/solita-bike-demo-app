import { getParams } from "./helperService";

const getAllStations = async (p: {
  limit: number;
  offset: number;
  orderby: string;
  ordering: string;
  stationName?: string
}) => {
  try {
    const response = fetch(
      `http://localhost:3002/stations?` +
        getParams(p)
    );
    return (await response).json();
  } catch (error) {
    return [];
  }
};

const getStationsById = async (p: string[]) => {
  const body = JSON.stringify(p);
  try {
    const response = fetch(
      `http://localhost:3002/stations`,
      {
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );
    return (await response).json();
  } catch (error) {
    return [];
  }
};

const getStationStatistics = async (id: string, from: string, to: string) => {
  try {
    const response = fetch(
      `http://localhost:3002/station/stats/${id}?` +
      getParams({from, to})
    );
    return (await response).json();
  } catch (error) {
    return [];
  }
};

export { getAllStations, getStationsById, getStationStatistics };
