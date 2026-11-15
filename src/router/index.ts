import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ErrorPage from '@/views/404.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/error',
    name: 'ErrorPage',
    component: ErrorPage,
  },
  {
    // ✅ Syntaxe Vue Router 4 pour les routes "catch-all"
    path: '/:pathMatch(.*)*',
    redirect: () => ({ name: 'ErrorPage' }),
  },
]

const router = createRouter({
  // ✅ Vite : import.meta.env au lieu de process.env
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
  const publicPages = ['/', '/error']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    // ✅ Retour direct au lieu de next()
    return { name: 'ErrorPage' }
  }

  // ✅ Retourner true pour continuer la navigation
  return true
})

export default router