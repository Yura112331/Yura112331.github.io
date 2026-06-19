import { createApp } from 'vue'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import './assets/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      gcTime: 1000 * 60 * 60 * 2,
      retry: 2
    }
  }
})

createApp(App)
  .use(router)
  .use(VueQueryPlugin, { queryClient })
  .use(i18n)
  .mount('#app')