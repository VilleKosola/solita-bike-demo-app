import { defineStore } from "pinia";
import type { Station } from "src/types/station";
import {assign} from 'lodash';

export interface PaginationSettings {
  orderBy: string,
  limit: number,
  offset: number,
  ordering: 1 | -1,
  stationName: string
}

export const useStationStore = defineStore("stations", {
  state: () => ({
    /** @type {Station[]} */
    stations: [] as Station[],
    // /** @type {} */
    pagination: {
      orderBy: 'nimi',
      limit: 100,
      offset: 0,
      ordering: 1,
      stationName: ''
    } as PaginationSettings,
  }),
  getters: {
    stationsByIds: (state) => {
      return (ids: number[]) => state.stations.filter(s => ids.findIndex(id => id == s.id));
    },
    filteredStations: (state) => {
      const p = state.pagination;
      return (state.stations
        .sort((a,b) => (a[p.orderBy as keyof Station].toString()).localeCompare((b[p.orderBy as keyof Station]).toString()) * p.ordering )
        .filter(s => 
          s.nimi.trim().toLowerCase().includes(p.stationName.toLowerCase().trim()) ||
          s.osoite.trim().toLowerCase().includes(p.stationName.toLowerCase().trim())
          )
        .slice(p.offset, p.offset + p.limit)
        );
    },
    getPagination: (state) => {
      return state.pagination;
    }
  },
  actions: {
    changePagination(pagination: Partial<PaginationSettings>) {
      this.pagination = assign(this.pagination, pagination);
    },
    setStations(stations: Station[]) {
      this.stations = stations;
    },
    addStation(station: Station) {
      // you can directly mutate the state
      this.stations.push(station)
    },
  },
})
