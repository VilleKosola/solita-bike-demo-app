const getAllStations = async (p: {
  limit: number;
  offset: number;
  orderby: string;
  ordering: string;
}) => {
  try {
    const response = fetch(
      `http://localhost:3002/station?` +
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

export { getAllStations };
