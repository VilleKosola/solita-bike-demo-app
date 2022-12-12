import { defineStore } from "pinia";
import type { Station } from "src/types/station";

export interface PaginationSettings {

}

export const useStationStore = defineStore("stations", {
  state: () => ({
    /** @type {Station[]} */
    stations: [] as Station[],
    // /** @type {} */
    pagination: 'all',
  }),
  getters: {
    /**
     * @returns {Station[]}
     */
    filteredStations(): Station[] {
      return this.stations;
    },
  },
  actions: {
    changePagination(pagination: PaginationSettings) {

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
