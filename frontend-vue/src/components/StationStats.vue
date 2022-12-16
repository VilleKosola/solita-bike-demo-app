<script setup lang="ts">
import { getStationStatistics } from '@/services/stationsService';
import type { Station, StationStatistics } from '@/types/station';
import { reactive } from 'vue';
import dayjs from 'dayjs';

interface SelectObject {
  name: string;
  from: string;
  to: string;
}

const selections: SelectObject[] = [
  { name: 'All', from: '2018-01-01 00:00', to: '2023-01-01 00:00' },
  { name: 'May 2021', from: '2021-05-01 00:00', to: '2021-06-01 00:00' },
  { name: 'June 2021', from: '2021-06-01 00:00', to: '2021-07-01 00:00' },
  { name: 'July 2021', from: '2021-07-01 00:00', to: '2021-08-01 00:00' },
  { name: 'August 2021', from: '2021-08-01 00:00', to: '2021-08-01 00:00' },
];

const props = defineProps<{ 
  station: Station;
}>()

const state = reactive({data: {} as StationStatistics, selection: 'All'});

const timeFrameChange = (timeFrame: string) => {
    const selection =
      selections.find((s) => s.name === timeFrame) ?? selections[0];
    const from = dayjs(selection.from).format('YYYY-MM-DD');
    const to = dayjs(selection.to).format('YYYY-MM-DD');
    getStationStatistics(props.station.id.toString(), from, to).then((d) => {
      state.data = d;
    });
}
timeFrameChange('All')

</script>
<template>
    <div class="grid grid-cols-2 relative">
      <div class="flex flex-col justify-center mx-auto">
        <p class="font-bold text-center">Trips starting from</p>
        <p>Count: {{state.data.starting_count}}</p>
        <p>Avg distance: {{(Number(state.data.avg_dist_from) / 1000).toFixed(2)}}km</p>
        <p class="text-center font-semibold">Top 5</p>
        <ul>
            <li v-for="(item, i) of state.data.starting_from_top">
              {{i + 1}}. {{item.return_station_name}}: {{item.numberoftrips}}
            </li>
        </ul>
      </div>
      <div class="flex flex-col align-middle mx-auto">
        <p class="font-bold text-center">Trips ending to</p>
        <p>Count: {{state.data.ending_count}}</p>
        <p>Avg distance: {{(Number(state.data.avg_dist_to) / 1000).toFixed(2)}}km</p>
        <p class="text-center font-semibold">Top 5</p>
        <ul>
            <li v-for="(item, i) of state.data.ending_to_top">
              {{i + 1}}. {{item.departure_station_name}}: {{item.numberoftrips}}
            </li>
        </ul>
      </div>
      <div class="absolute right-5">
        <select
            v-model="state.selection"
          class="border-solid border-1 border-b-slate-600"
          @change="(e: any) => {
            timeFrameChange(e.target.value);
          }"
        >
            <option v-for="s of selections" :value="s.name">
              {{s.name}}
            </option>
        </select>
      </div>
    </div>
</template>