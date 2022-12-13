<script setup lang="ts">
  import Pagination from '@/components/Pagination.vue';
  import TableHeader from '@/components/TableHeader.vue';
  import { useStationStore } from '@/stores/stations';
import { computed } from '@vue/reactivity';
  import { reactive } from 'vue';
  const stationStore = reactive(useStationStore())
  const orderString = computed(() => stationStore.pagination.ordering > 0 ? 'ASC' : 'DESC')
  const p = computed(() => stationStore.pagination)
  const toggleOrdering = () => {
    return stationStore.pagination.ordering < 0 ? 1 : -1;
  }
</script>

<template>
  <div className="flex flex-wrap justify-between items-center">
        <Pagination/>
      </div>
      <ul className="journeys bg-slate-300 font-bold text-black">
        <li className="grid grid-cols-10 p-2 border-b">
          <!-- <p className="text-left"> #. </p> -->
          <TableHeader
            :clickFn="() => ''"
            label="#."
            :ordering="orderString"
            :active="false"
            :className="['text-left']"
          />
          <TableHeader
            :clickFn="() => {
              stationStore.changePagination({orderBy:'nimi', ordering: toggleOrdering()});
            }"
            label="Name"
            :ordering="orderString"
            :active="p.orderBy === 'nimi'"
            :className="['text-left', 'col-span-2', 'cursor-pointer']"
          />
          <!-- <p
            className="text-left col-span-2 cursor-pointer"
            @click="() => {
              stationStore.changePagination({orderBy:'nimi', ordering: toggleOrdering()});
            }"
          >
            {{'Name'}}
          </p> -->
          <TableHeader
            :clickFn="() => {
              stationStore.changePagination({orderBy:'osoite', ordering: toggleOrdering()});
            }"
            label="Address"
            :ordering="orderString"
            :active="p.orderBy === 'osoite'"
            :className="['text-left', 'col-span-2', 'cursor-pointer']"
          />
          <!-- <p
            className="text-left col-span-2 cursor-pointer"
            @click="() => {
              stationStore.changePagination({orderBy:'osoite', ordering: toggleOrdering()});
            }"

          >
            {{'Address'}}
          </p> -->
          <p
            className="text-left cursor-pointer"
            @click="() => {
              stationStore.changePagination({orderBy:'city', ordering: toggleOrdering()});
            }"
          >
            {{'City'}}
          </p>
          <p
            className="text-left cursor-pointer"
            @click="() => {
              stationStore.changePagination({orderBy:'operator', ordering: toggleOrdering()});
            }"
          >
            {{'Operator'}}
          </p>
          <p
            className="text-left cursor-pointer"
            @click="() => {
              stationStore.changePagination({orderBy:'x_coordinate', ordering: toggleOrdering()});
            }"
          >
            {{'X-coordinate'}}
          </p>
          <p
            className="text-left cursor-pointer"
            @click="() => {
              stationStore.changePagination({orderBy:'y_coordinate', ordering: toggleOrdering()});
            }"
          >
            {{'Y-coordinate'}}
          </p>
          <p className="text-right"> Actions </p>
        </li>
      </ul>
      <!-- <StationList stations={stationStore.filteredStations} offset={offset} /> -->
</template>
