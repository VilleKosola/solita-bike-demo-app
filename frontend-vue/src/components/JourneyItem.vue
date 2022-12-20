<script setup lang="ts">
import type { Journey } from '@/types/journey';
import MapWrapper from './MapWrapper.vue';
import dayjs from 'dayjs';
const props = defineProps<{ 
    journey: Journey;
  index: number;
  active: boolean;
  setActive: any;
}>()

</script>
<template>
<li
        class="grid grid-cols-10 p-2 border-b cursor-pointer hover:bg-gray-200 hover:text-black"
        data-testid="journey-item"
        @click="() => props.setActive(journey.id.toString())"
      >
      <p className="text-left"> {{index}}. </p>
        <p className="text-left col-span-2">
          {{' '}}
          {{journey.departure_station_name}}
        </p>
        <p className="text-left col-span-2"> {{journey.return_station_name}}</p>
        <p className="text-left">
          {{dayjs(journey.departuredate).format('DD.MM.YYYY')}}
        </p>
        <p className="text-left">
          {{dayjs(journey.returndate).format('DD.MM.YYYY')}}
        </p>
        <p className="text-left">{{journey.distance / 1000}}km</p>
        <p className="text-left">
          {{Math.floor(journey.duration / (60 * 60 * 24)) +
            'vrk ' +
            Math.floor((journey.duration % (60 * 60 * 24)) / (60 * 60)) +
            'h ' +
            Math.floor((journey.duration % (60 * 60)) / 60) +
            'min ' +
            (journey.duration % 60)}}
          s
        </p>
      </li>
      <div v-if="active">
        <MapWrapper
          :stationIds="[
            journey.departure_station.toString(),
            journey.return_station.toString(),
          ]"
        />
      </div>
</template>