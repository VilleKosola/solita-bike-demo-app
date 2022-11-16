import { Journey } from '../types/journey';
import JourneyItem from '../components/journey-item';

const JourneysList = (props: { journeys: Journey[]; offset: number }) => {
  return (
    <ul className="journeys">
      {props.journeys.map((journey: Journey, i: number) => (
        <JourneyItem
          data-testid="journey-item"
          key={journey.id}
          journey={journey}
          index={i + 1 + props.offset}
        />
      ))}
    </ul>
  );
};

export default JourneysList;
