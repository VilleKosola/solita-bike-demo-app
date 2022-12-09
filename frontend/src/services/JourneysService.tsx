import { Journey } from '../types/journey';
import { getParams } from './helperService';
import { baseUrl } from '../globals';


export interface JournalParams {
  limit: number;
  offset: number;
  orderby: string;
  ordering: string;
  startStationName: string;
  endStationName: string;
  from: string;
  to: string;
  minDist: number;
  maxDist: number;
  minDur: number;
  maxDur: number;
}

const getAllJourneys = async (p: JournalParams) => {
  try {
    const response = fetch(`${baseUrl}/journey?` + getParams({ ...p }));
    return (await response).json();
  } catch (error) {
    return [];
  }
};

const postJourney = async (journey: Journey) => {
  const body = JSON.stringify(journey);
  try {
    const response = fetch(`${baseUrl}/journey`, {
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

const deleteJourney = async (id: number | string) => {
  try {
    const response = fetch(`${baseUrl}/journey/${id}`, {
      method: 'DELETE',
    });
    return (await response).json();
  } catch (error) {
    return [];
  }
};

export { getAllJourneys, postJourney, deleteJourney };
