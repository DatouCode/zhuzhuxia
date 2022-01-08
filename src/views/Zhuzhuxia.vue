<script lang="ts">
import {defineComponent, ref, onMounted, getCurrentInstance, ComponentInternalInstance} from 'vue';
import {useRouter} from 'vue-router'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import * as api from "@/server/api";

dayjs.extend(customParseFormat)

export default defineComponent({
  setup() {
    const {appContext} = getCurrentInstance() as ComponentInternalInstance;
    const router = useRouter()
    const $message = appContext.config.globalProperties.$message;
    const value = ref<dayjs.Dayjs>();
    const today = dayjs(new Date()).format("MMMM D, YYYY")
    // 今日已签？
    const user = ref<string>(localStorage.getItem('user') || '');
    const primaryText = ref<string>("签到");
    const todaySign = ref<boolean>(false);
    let continuousDays = ref<number>(0);

    const onPanelChange = (value: dayjs.Dayjs, mode: string) => {
      console.log(value, mode);
    };

    // 签到
    const primary = async () => {
      await api.sign(user.value, today);
      primaryText.value = '已签到';
      todaySign.value = true;
      $message.success("签到成功");
    }

    // 反冲
    const danger = async () => {
      await api.danger(user.value, today);
      localStorage.setItem('fanchong', today)
    }

    const confirm = (e: any) => {
      console.log(e);
      $message.success('Click on Yes');
    }
    const cancel = (e: any) => {
      console.log(e);
      $message.error('Click on No');
    }

    // 切换
    const dashed = async () => {
      localStorage.getItem('user') === 'datou'
          ? user.value = 'aybx'
          : user.value = 'datou';
      $message.info(`已切换至用户：${user.value}`);
      await wait(1500);
      localStorage.setItem('user', user.value);
      router.go(0)
    }

    onMounted(async () => {
      // const mes: any = inject('$message')
      // console.log(mes)
      // mes.success('test $message injected.')

      let signDays = await api.signDays(user.value);
      for (let date of signDays) {
        let td = document.querySelector(`td[title='${date}']`) as HTMLElement;
        td.style.background = `url("https://tb2.bdstatic.com/tb/img/sign_mob_have_73ee435.gif?v=1.0") center no-repeat`;
      }

      let today = dayjs(new Date()).format("MMMM D, YYYY")
      console.log('today', today)

      if (localStorage.getItem('fanchong') === today) {
        primaryText.value = '已反冲';
        todaySign.value = true;
      }

      if (signDays.includes(today)) {
        todaySign.value = true;
        primaryText.value = '已签到';
      } else {
        console.log('未签到')
      }
    })

    $message.info(`当前用户： ${user.value}`);

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    return {
      value,
      continuousDays,
      primaryText,
      todaySign,

      primary,
      onPanelChange,
      danger,
      confirm,
      cancel,
      dashed
    };
  },
});
</script>

<template>
  <div id="app">
    <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
      <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange"/>
    </div>

    <a-row type="flex" justify="space-around">
      <a-col :span="8">
        <a-button type="primary" :disabled="todaySign" @click="primary"> {{ primaryText }}</a-button>
      </a-col>

      <a-col :span="8" style="text-align: center">
        <a-popconfirm
            title="确定反冲吗？"
            ok-text="冲呀"
            cancel-text="算了"
            @confirm="confirm"
            @cancel="cancel"
        >
          <a-button type="danger" @click="danger"> 反冲</a-button>
        </a-popconfirm>
      </a-col>

      <a-col :span="8" style="text-align: right">
        <a-button type="dashed" @click="dashed"> 切换</a-button>
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