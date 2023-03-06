import { createRouter, createWebHistory } from 'vue-router'
import mapPeru from '../components/mapPeru.vue'
import mapChile from '../components/mapChile.vue'
import mapBrasil from '../components/mapBrasil.vue'

const routes = [
  {
    path: '/peru',
    name: 'Peru',
    component: mapPeru
  },
  {
    path: '/chile',
    name: 'Chile',
    component: mapChile
  },
  {
    path: '/brasil',
    name: 'Brasil',
    component: mapBrasil
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router