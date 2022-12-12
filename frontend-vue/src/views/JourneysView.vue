<script lang="ts">
import { useStationStore } from '@/stores/stations';
import type { Station } from '@/types/station';

  export default {
    data() {
      return {
        stationStore: useStationStore()
      }
    },
    // created() {
    //   // Simple GET request using fetch
    //   fetch("http://localhost:3002/stations")
    //     .then(response => response.json())
    //     .then((data: Station[]) => (this.stations = data));
    // }
  }
</script>

<template>
  <p v-for="s in stationStore.filteredStations" class="greeting">{{ s.nimi }}</p>
</template>
