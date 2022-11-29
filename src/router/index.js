import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Chat.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/Chat.vue')
    }
  ]
})

export default router
