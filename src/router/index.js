import { createWebHashHistory, createRouter } from 'vue-router'

import Main from '@/views/Main.vue'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'

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
      {
        path: '/user',
        name: 'user',
        component: User,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
