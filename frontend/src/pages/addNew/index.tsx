import React from 'react';
import AddJourney from '../../components/add-journey';
import AddStation from '../../components/add-station';
import FilterContainer from '../../components/filter-container';

const AddNew = () => {
  //   const [path, setPath] = React.useState(window.location.pathname);

  return (
    <FilterContainer>
      <AddStation />
      <AddJourney />
    </FilterContainer>
  );
};

export default AddNew;
