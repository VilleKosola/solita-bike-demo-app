import React, { createContext, useContext, useReducer } from 'react';
import { Station } from '../../types/station';

export interface ReducerAction {
  type: 'set' | 'create' | 'update' | 'delete' | 'clear';
  id: string | number;
  stations: Station[];
}

const StationsContext = createContext([] as Station[]);
const StationsDispatchContext = createContext(
  null as unknown as React.Dispatch<ReducerAction>
);

const StationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [stations, dispatch] = useReducer(stationsReducer, [] as Station[]);

  return (
    <StationsContext.Provider value={stations}>
      <StationsDispatchContext.Provider value={dispatch}>
        {children}
      </StationsDispatchContext.Provider>
    </StationsContext.Provider>
  );
};

const useStations = () => {
  return useContext(StationsContext);
};

const useStationsDispatch = () => {
  return useContext(StationsDispatchContext);
};

const stationsReducer = (stations: Station[], action: ReducerAction) => {
  switch (action.type) {
    case 'set': {
      return action.stations;
    }
    case 'create': {
      return [
        {
          ...action.stations[0],
        },
        ...stations,
      ];
    }
    case 'update': {
      return stations.map((t) => {
        if (t.id === action.stations[0].id) {
          return action.stations[0];
        } else {
          return t;
        }
      });
    }
    case 'delete': {
      return stations.filter((t) => t.id !== action.id);
    }
    case 'clear': {
      return [];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

export { useStationsDispatch, useStations, StationsProvider };
