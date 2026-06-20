import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'InkBeat — Музичний артист | Автор пісень' }
  },
  {
    path: '/about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'Про мене | InkBeat' }
  },
  {
    path: '/discography',
    component: () => import('@/views/DiscographyView.vue'),
    meta: { title: 'Дискографія | InkBeat' }
  },
  {
    path: '/services',
    component: () => import('@/views/ServicesView.vue'),
    meta: { title: 'Послуги | InkBeat' }
  },
  {
    path: '/portfolio',
    component: () => import('@/views/PortfolioView.vue'),
    meta: { title: 'Портфоліо | InkBeat' }
  },
  {
    path: '/contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: 'Контакти | InkBeat' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  if (to && to.meta) {
    document.title = (to.meta.title as string) || 'InkBeat'
  } else {
    document.title = 'InkBeat'
  }
})

export default router