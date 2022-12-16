<script setup lang="ts">
import classNames from 'classnames';
const props = defineProps<{ 
  clickFn: any;
  label: string;
  ordering: 'DESC' | 'ASC';
  active: boolean;
  className: string[];
}>()

</script>
<template>
  <p
    :class="classNames('flex', 'items-center', props.className)"
    @click="clickFn"
  >
    {{ props.label }}
    <i v-if="active" :class="classNames('ml-2', 'ordering', props.ordering)"></i>
  </p>
</template>
