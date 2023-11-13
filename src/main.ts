import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import routes from '~pages'

import './styles.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...routes,

    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/dashboard'
    }
  ]
})

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')
