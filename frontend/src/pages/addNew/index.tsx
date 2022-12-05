import React from 'react';
import AddJourney from '../../components/add-journey';
import AddStation from '../../components/add-station';
import FilterContainer from '../../components/filter-container';

const AddNew = () => {
  const [active, setActive] = React.useState('S');

  return (
    <FilterContainer>
      <AddStation active={active === 'S'} handleActivation={setActive} />
      <AddJourney active={active === 'J'} handleActivation={setActive} />
    </FilterContainer>
  );
};

export default AddNew;
