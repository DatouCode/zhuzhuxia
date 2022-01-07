<script lang="ts">
import {defineComponent, ref, onMounted} from 'vue';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat)

export default defineComponent({
  setup() {
    const value = ref<dayjs.Dayjs>();
    const onPanelChange = (value: dayjs.Dayjs, mode: string) => {
      console.log(value, mode);
    };

    const select = (value: dayjs.Dayjs) => {
      // January 7, 2022
      console.log(dayjs(value).format('MMMM D, YYYY'));
    };

    onMounted(() => {
      console.log(dayjs('2019-01-25').format('DD/MM/YYYY'))
    })

    return {
      value,
      onPanelChange,
      select,
    };
  },
});
</script>

<template>
  <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
    <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange" @select="select"/>
  </div>
</template>