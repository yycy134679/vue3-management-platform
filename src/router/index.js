import { createWebHashHistory, createRouter } from 'vue-router'

import Main from '@/views/Main.vue'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
