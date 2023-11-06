import { createApp } from 'vue'
import './styles.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import routes from '~pages'

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

createApp(App).use(router).mount('#app')
