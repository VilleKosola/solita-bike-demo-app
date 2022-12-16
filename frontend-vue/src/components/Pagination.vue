<script setup lang="ts">
import { useStationStore } from '@/stores/stations';
import { reactive } from 'vue';
  const stationStore = reactive(useStationStore());
  const p = stationStore.getPagination;
  let limit = 100;
</script>

<template>
  <div
    class="flex w-full justify-between p-3 pagination-parent"
  >
    <div></div>
    <div
      v-if="p.offset > 0"
      id="offset-previous"
      class="font-bold rounded-full bg-white text-black w-7 h-7 flex items-center justify-center cursor-pointer"
      @click="() => {
        stationStore.changePagination({offset: p.offset - p.limit});
      }"
    >
      <span>{{' < '}}</span>
    </div>
    <div v-else="p.offset > 0"></div>

    <div class="text-center">
      {{ p.offset }} {{'-'}} {{ p.offset + p.limit }}
    </div>

    <div
      class="font-bold rounded-full bg-white text-black w-7 h-7 flex items-center justify-center cursor-pointer"
      @click="() => {
        stationStore.changePagination({offset: p.offset + p.limit});
      }"
    >
      {{' > '}}
    </div>
    <div>
      <select
        class="text-black"
        @change="(e: any) => {
          stationStore.changePagination({limit: Number(e.target.value), offset: 0});
        }"
        v-model="limit"
      >
        <option :value="10">10</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
        <option :value="1000">1000</option>
      </select>
    </div>
  </div>
</template>
