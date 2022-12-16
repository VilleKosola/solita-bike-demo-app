<script setup lang="ts">
import type { Station } from '@/types/station';
const props = defineProps<{ 
  station: Station;
  index: number;
  active: boolean;
  setActive: any;
}>()

</script>
<template>
<li
        class="grid grid-cols-10 p-2 border-b cursor-pointer hover:bg-gray-200 hover:text-black"
        data-testid="station-item"
        @click="() => props.setActive(station.id.toString())"
      >
        <p class="text-left"> {{props.index}}. </p>
        <p class="text-left col-span-2"> {{station.nimi}}</p>
        <p class="text-left col-span-2"> {{station.osoite}}</p>
        <p class="text-left">{{station.city}}</p>
        <p class="text-left">{{station.operator}}</p>
        <p class="text-left">{{station.x_coordinate}}</p>
        <p class="text-left">{{station.y_coordinate}}</p>
        <!-- <p v-if="!station.fid" class="flex justify-end items-center">
          <button
            @click={removeStation}
            class="cursor-pointer border border-solid border-l-gray-400"
          >
            Delete
          </button>
        </p>-->
        <p></p> 
      </li>
      <div v-if="props.active">
        <!-- <StationStats station={station}></StationStats>
        <LeafletMap
          locations={[
            {
              x: station.x_coordinate,
              y: station.y_coordinate,
              name: station.nimi,
              id: station.fid,
            },
          ]}
          onClick={() => ''}
          enableMarkerAdd={false}
        /> -->
      </div>
</template>