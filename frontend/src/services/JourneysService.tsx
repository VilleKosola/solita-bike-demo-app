const getAllJourneys = async (p: {
  limit: number;
  offset: number;
  orderby: string;
  ordering: string;
}) => {
  try {
    const response = fetch(
      `http://localhost:3002/journey?` +
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

export { getAllJourneys };
