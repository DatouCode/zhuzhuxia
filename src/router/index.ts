import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Zhuzhuxia',
    component: () => import('@/views/Zhuzhuxia.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/Test.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes,
})

export default router