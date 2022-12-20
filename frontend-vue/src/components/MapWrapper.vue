<script setup lang="ts">
import { getStationsById } from '@/services/stationsService';
import type { Location, Station } from '@/types/station';
import { ref, watch } from 'vue';
import MapItemVue from './MapItem.vue';
const props = defineProps<{
    stationIds: string[];
}>();

const stations = ref([] as Location[]);
    if (props.stationIds?.length) {
      getStationsById(props.stationIds).then((data: Station[]) => {
        const s = data.map((st, i) => {
          return {
            lng: st.x_coordinate,
            lat: st.y_coordinate,
            name: st.nimi,
            id: st.fid,
            color: st.id.toString() === props.stationIds[0] ? 'green' : 'red',
          };
        });
        stations.value = s;
      });
    }
</script>

<template>
    <MapItemVue :locations="stations"></MapItemVue>
</template>