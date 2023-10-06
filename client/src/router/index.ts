import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MarketplaceView from '@/views/MarketplaceView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import AchievementsView from '@/views/AchievementsView.vue'
import TransactionsView from '@/views/TransactionsView.vue'

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
      path: '/marketplace',
      name: 'marketplace',
      component: () => MarketplaceView
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
    },
    {
      path: '/achievements',
      name: 'achievements',
      component: () => AchievementsView
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () => TransactionsView
    }
  ]
})

export default router
