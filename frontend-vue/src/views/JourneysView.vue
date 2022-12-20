<script lang="ts">
import Pagination from '@/components/Pagination.vue';
import TableHeader from '@/components/TableHeader.vue';
import { useStationStore } from '@/stores/stations';
import { computed, ref } from '@vue/reactivity';
import { reactive, watch } from 'vue';
import StationItem from '@/components/StationItem.vue';
import Searchbar from '@/components/Searchbar.vue';
import type { Journey } from '@/types/journey';
import { getAllJourneys } from '@/services/journeysService';
import JourneyItemVue from '@/components/JourneyItem.vue';

export default {
  components: {
    StationItem,
    Searchbar,
    Pagination,
    TableHeader,
    JourneyItemVue
},
  setup() {
    const stationStore = reactive(useStationStore())
    const orderString = computed(() => stationStore.pagination.ordering > 0 ? 'ASC' : 'DESC')
    const p = computed(() => stationStore.pagination)
    const state = reactive({ 
      active: '', 
      from: new Date('2020-04-01 00:00'), 
      to: new Date('2023-09-01 00:00'), 
      minDist: 0, 
      maxDist: 100, 
      minDur: 0, 
      maxDur: 1000000 
    });
    const setActive = (id: string) => {
      state.active = id;
    };
    const toggleOrdering = () => {
      return stationStore.pagination.ordering < 0 ? 1 : -1;    
    }

    const changeState = () => {

    } 
    const journeys = ref([] as Journey[])

    watch(stationStore, async (newStore, oldStore) => {
      const {from, to, minDist, maxDist, minDur, maxDur} = state;
      const {limit, offset, stationName} = newStore.pagination;
      setTimeout(() => {
        getAllJourneys({
          limit,
          offset,
          orderby: '',
          ordering: 'ASC',
          endStationName: stationName,
          startStationName: stationName,
          from: from.toISOString(),
          to: to.toISOString(),
          minDist: minDist * 1000,
          maxDist: maxDist * 1000,
          minDur,
          maxDur,
        }).then((data) => journeys.value = (data));
      }, 500);
    })

    return {
      orderString,
      setActive,
      state,
      toggleOrdering,
      stationStore,
      p,
      journeys
    }
  },
}
</script>

<template>
  <div className="flex flex-wrap justify-between items-center">
    <Searchbar :set-active="setActive" :searchStringChange="() => ''" name="station-string" />
    <Pagination />
  </div>
  <ul className="journeys bg-slate-300 font-bold text-black">
    <li className="grid grid-cols-10 p-2 border-b">
      <!-- <p className="text-left"> #. </p> -->
      <TableHeader :clickFn="() => ''" label="#." :ordering="orderString" :active="false" :className="['text-left']" />
      <TableHeader :clickFn="() => {
        stationStore.changePagination({ orderby: 'departure_station_name', ordering: toggleOrdering() });
      }" label="Start station" :ordering="orderString" :active="p.orderby === 'departure_station_name'"
        :className="['text-left', 'col-span-2', 'cursor-pointer']" />
      <TableHeader :clickFn="() => {
        stationStore.changePagination({ orderby: 'return_station_name', ordering: toggleOrdering() });
      }" label="End station" :ordering="orderString" :active="p.orderby === 'return_station_name'"
        :className="['text-left', 'col-span-2', 'cursor-pointer']" />
      <TableHeader :clickFn="() => {
        stationStore.changePagination({ orderby: 'departuredate', ordering: toggleOrdering() });
      }" label="Start date" :ordering="orderString" :active="p.orderby === 'departuredate'"
        :className="['text-left', 'cursor-pointer']" />
      <TableHeader :clickFn="() => {
        stationStore.changePagination({ orderby: 'returndate', ordering: toggleOrdering() });
      }" label="End date" :ordering="orderString" :active="p.orderby === 'returndate'"
        :className="['text-left', 'cursor-pointer']" />

      <TableHeader :clickFn="() => {
        stationStore.changePagination({ orderby: 'distance', ordering: toggleOrdering() });
      }" label="Distance" :ordering="orderString" :active="p.orderby === 'distance'"
        :className="['text-left', 'cursor-pointer']" />
      <TableHeader :clickFn="() => {
        stationStore.changePagination({ orderby: 'duration', ordering: toggleOrdering() });
      }" label="Duration" :ordering="orderString" :active="p.orderby === 'duration'"
        :className="['text-left', 'cursor-pointer']" />
      <p className="text-right"> Actions </p>
    </li>
  </ul>
  <ul className="stations">
    <JourneyItemVue v-for="(journey, i) in journeys" :journey="journey" :index="i + 1 + p.offset"
      :active="
        state.active === journey.id.toString() || journeys.length === 1
      " :setActive="(id: string) =>
  id === state.active ? setActive('') : setActive(id)
" />
  </ul>
</template>

