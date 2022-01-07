<script lang="ts">
import {defineComponent, ref, onMounted} from 'vue';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import * as api from './server/api';

dayjs.extend(customParseFormat)

export default defineComponent({
  setup() {
    const value = ref<dayjs.Dayjs>();
    // 今日已签？
    const primaryText = ref<string>("签到");
    const todaySign = ref<boolean>(false);
    let continuousDays = ref<number>(0);

    const onPanelChange = (value: dayjs.Dayjs, mode: string) => {
      console.log(value, mode);
    };

    // 签到
    const primary = async () => {
      let today = dayjs(new Date()).format("MMMM D, YYYY")
      console.log(typeof today)
      await api.sign(today);
      primaryText.value = '已签到';
      todaySign.value = true;
    }

    // 反冲
    const danger = async () => {
      let today = dayjs(new Date()).format("MMMM D, YYYY")
      await api.danger(today);
    }

    onMounted(async () => {
      let signDays = await api.signDays();

      for (let date of signDays) {
        let td = document.querySelector(`td[title='${date}']`) as HTMLElement;
        td.style.background = `url("https://tb2.bdstatic.com/tb/img/sign_mob_have_73ee435.gif?v=1.0") center no-repeat`;
      }

      let today = dayjs(new Date()).format("MMMM D, YYYY")
      console.log('today', today)
      if (signDays.includes(today)) {
        todaySign.value = true;
        primaryText.value = '已签到';
      } else {
        console.log('未签到')
      }
    })

    return {
      value,
      continuousDays,
      primaryText,
      todaySign,

      primary,
      onPanelChange,
      danger,
    };
  },
});
</script>

<template>
  <div id="app">
    <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
      <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange" @select="select"/>
    </div>

    <a-row type="flex" justify="space-around">
      <a-col :span="8">
        <a-button type="primary" :disabled="todaySign" @click="primary"> {{ primaryText }}</a-button>
      </a-col>
      <a-col :span="8" style="text-align: center">
        <a-button type="danger" @click="danger"> 反冲</a-button>

      </a-col>
      <a-col :span="8" style="text-align: right">
        <a-button type="dashed"> 切换</a-button>

      </a-col>
    </a-row>

  </div>

</template>

<style lang="css">
#app {
  width: 300px;
  margin: 0 auto;
}
</style>