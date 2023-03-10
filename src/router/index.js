import { createRouter, createWebHistory } from 'vue-router'
import mapPeru from '../components/mapPeru.vue'
import mapPeruRainforest from '../components/mapPeruRainforest.vue'
import mapPeruHighlands from '../components/mapPeruHighlands.vue'
import mapPeruCoast from '../components/mapPeruCoast.vue'
import mapChile from '../components/mapChile.vue'
import mapChileAustral from '../components/mapChileAustral.vue'
import mapChileSur from '../components/mapChileSur.vue'
import mapChileCentral from '../components/mapChileCentral.vue'
import mapChileNorteChico from '../components/mapChileNorteChico.vue'
import mapChileNorteGrande from '../components/mapChileNorteGrande.vue'
import mapBrasil from '../components/mapBrasil.vue'
import mapBrasilSouth from '../components/mapBrasilSouth.vue'
import selectMap from '../components/selectMap.vue'

const routes = [
  {
    path: '/peru',
    name: 'Peru',
    component: mapPeru
  },
  {
    path: '/peruRainforest',
    name: 'Peru Rainforest',
    component: mapPeruRainforest
  },
  {
    path: '/peruHighlands',
    name: 'Peru Highlands',
    component: mapPeruHighlands
  },
  {
    path: '/peruCoast',
    name: 'Peru Coast',
    component: mapPeruCoast
  },
  {
    path: '/chile',
    name: 'Chile',
    component: mapChile
  },
  {
    path: '/chileAustral',
    name: 'Chile Austral',
    component: mapChileAustral
  },
  {
    path: '/chileSur',
    name: 'Chile Sur',
    component: mapChileSur
  },
  {
    path: '/chileCentral',
    name: 'Chile Central',
    component: mapChileCentral
  },
  {
    path: '/chileNorteChico',
    name: 'Chile Norte Chico',
    component: mapChileNorteChico
  },
  {
    path: '/chileNorteGrande',
    name: 'Chile Norte Grande',
    component: mapChileNorteGrande
  },
  {
    path: '/brasil',
    name: 'Brasil',
    component: mapBrasil
  },
  {
    path: '/brasilSul',
    name: 'Brasil Sul',
    component: mapBrasilSouth
  },
  {
    path: '/',
    name: 'selectMap',
    component: selectMap
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
