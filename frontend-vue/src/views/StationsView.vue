<script setup lang="ts">
import Pagination from "@/components/PaginationRow.vue";
import TableHeader from "@/components/TableHeader.vue";
import { useStationStore } from "@/stores/stations";
import { computed } from "vue";
import { reactive } from "vue";
import StationItem from "@/components/StationItem.vue";
import Searchbar from "@/components/SearchBar.vue";
const stationStore = reactive(useStationStore());
const orderString = computed(() =>
  stationStore.pagination.ordering > 0 ? "ASC" : "DESC"
);
const p = computed(() => stationStore.pagination);
const toggleOrdering = () => {
  return stationStore.pagination.ordering < 0 ? 1 : -1;
};
const state = reactive({ active: "" });
const setActive = (id: string) => {
  state.active = id;
};
</script>

<template>
  <div className="flex flex-wrap justify-between items-center">
    <Searchbar
      :set-active="setActive"
      :searchStringChange="() => ''"
      name="station-string"
    />
    <Pagination />
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
        :clickFn="
          () => {
            stationStore.changePagination({
              orderby: 'nimi',
              ordering: toggleOrdering(),
            });
          }
        "
        label="Name"
        :ordering="orderString"
        :active="p.orderby === 'nimi'"
        :className="['text-left', 'col-span-2', 'cursor-pointer']"
      />
      <TableHeader
        :clickFn="
          () => {
            stationStore.changePagination({
              orderby: 'osoite',
              ordering: toggleOrdering(),
            });
          }
        "
        label="Address"
        :ordering="orderString"
        :active="p.orderby === 'osoite'"
        :className="['text-left', 'col-span-2', 'cursor-pointer']"
      />
      <TableHeader
        :clickFn="
          () => {
            stationStore.changePagination({
              orderby: 'city',
              ordering: toggleOrdering(),
            });
          }
        "
        label="City"
        :ordering="orderString"
        :active="p.orderby === 'city'"
        :className="['text-left', 'cursor-pointer']"
      />
      <TableHeader
        :clickFn="
          () => {
            stationStore.changePagination({
              orderby: 'operator',
              ordering: toggleOrdering(),
            });
          }
        "
        label="Operator"
        :ordering="orderString"
        :active="p.orderby === 'operator'"
        :className="['text-left', 'cursor-pointer']"
      />

      <TableHeader
        :clickFn="
          () => {
            stationStore.changePagination({
              orderby: 'x_coordinate',
              ordering: toggleOrdering(),
            });
          }
        "
        label="X-coordinate"
        :ordering="orderString"
        :active="p.orderby === 'x_coordinate'"
        :className="['text-left', 'cursor-pointer']"
      />
      <TableHeader
        :clickFn="
          () => {
            stationStore.changePagination({
              orderby: 'y_coordinate',
              ordering: toggleOrdering(),
            });
          }
        "
        label="Y-coordinate"
        :ordering="orderString"
        :active="p.orderby === 'y_coordinate'"
        :className="['text-left', 'cursor-pointer']"
      />
      <p className="text-right">Actions</p>
    </li>
  </ul>
  <ul className="stations">
    <StationItem
      v-for="(station, i) in stationStore.filteredStations"
      v-bind:key="station.id"
      :station="station"
      :index="i + 1 + p.offset"
      :active="
        state.active === station.id.toString() ||
        stationStore.filteredStations.length === 1
      "
      :setActive="(id: string) =>
        id === state.active ? setActive('') : setActive(id)
      "
    />
  </ul>
</template>
