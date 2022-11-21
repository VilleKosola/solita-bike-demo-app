import { Journey } from '../../types/journey';
import JourneyItem from '../journey-item/journey-item';
import React from 'react';

const JourneysList = (props: { journeys: Journey[]; offset: number }) => {
  const [active, setActive] = React.useState('');
  return (
    <ul className="journeys">
      {props.journeys.map((journey: Journey, i: number) => (
        <JourneyItem
          data-testid="journey-item"
          key={journey.id}
          journey={journey}
          index={i + 1 + props.offset}
          active={active === journey.id.toString()}
          setActive={(id: string) =>
            id === active ? setActive('') : setActive(id)
          }
        />
      ))}
    </ul>
  );
};

export default JourneysList;
