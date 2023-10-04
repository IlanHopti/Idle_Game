import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InventoryView from '@/views/InventoryView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    // }
    {
      path: '/inventory',
      name: 'inventory',
      component: InventoryView
    },
    {
      path: '/register',
      name: 'register',
      component: () => RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: () => LoginView
    }
  ]
})

export default router
