const getAllStations = async (p: {
  limit: number;
  offset: number;
  orderby: string;
  ordering: string;
}) => {
  try {
    const response = fetch(
      `http://localhost:3002/stations?` +
        new URLSearchParams({
          limit: p.limit.toString(),
          offset: p.offset.toString(),
          orderby: p.orderby,
          ordering: p.ordering,
        })
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
      new URLSearchParams({
        from: from,
        to: to
      }),
    );
    return (await response).json();
  } catch (error) {
    return [];
  }
};

export { getAllStations, getStationsById, getStationStatistics };
