<script lang="ts" setup>
import { reactive } from "vue";
import type { Location } from '@/types/station';
import { GoogleMap, Marker } from "vue3-google-map";

const props = defineProps<{ 
  locations: Location[];
}>()

const state = reactive({center: { lng: 24.95, lat: 60.21 }})

const api_key = import.meta.env.VITE_GOOGLE_APIKEY;
</script>
<template>
  <GoogleMap :api-key="api_key" style="width: 100%; height: 250px" :center="state.center" :zoom="10">
    <Marker v-for="l of locations" :options="{ position: l }" />
  </GoogleMap>
</template>