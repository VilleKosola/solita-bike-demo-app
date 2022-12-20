<script setup lang="ts">
import { useStationStore } from "@/stores/stations";
import { reactive } from "vue";
const stationStore = reactive(useStationStore());
let searchString = "";
const show = false;
const props = defineProps<{
  name: string;
  searchStringChange: any;
  setActive: any;
}>();
</script>

<template>
  <div class="flex relative searchbar-parent">
    <div id="myDropdown" class="dropdown">
      <input
        type="text"
        v-model="searchString"
        placeholder="Search.."
        @focus="show = true"
        @blur="show = false"
        :id="props.name"
        class="searchbar"
        @keyup="(e: any) => {
            stationStore.changePagination({stationName: e.target.value});
            props.searchStringChange(e.target.value);
          }"
      />
      <div
        class="dropdown-content show"
        v-if="show && stationStore.filteredStations.length > 1 && searchString"
      >
        <span
          v-for="s of stationStore.filteredStations"
          v-bind:key="s.id"
          @click="(e: any) => {
              stationStore.changePagination({stationName: s.nimi});
              props.searchStringChange(s.nimi);
              searchString = s.nimi;
              props.setActive(props.name || '', s.id);
            }"
        >
          {{ s.nimi }}
        </span>
      </div>
    </div>
  </div>
</template>
