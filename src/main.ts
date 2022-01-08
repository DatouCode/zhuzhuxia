import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// import {message} from 'ant-design-vue'

const app = createApp(App)

// app.config.globalProperties.$message = message
// app.provide('$message', message)

app
  .use(Antd)
  .use(router)
  .mount('#app')
