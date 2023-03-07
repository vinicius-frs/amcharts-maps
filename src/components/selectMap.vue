<template>
  <mapBrasil v-if="selectedMap == 'brasil'" />
  <mapChile v-if="selectedMap == 'chile'" />
  <mapPeru v-if="selectedMap == 'peru'" />
  <div v-else style="text-align: center;"><h1>Mapa não disponível</h1></div>
</template>

<script>

import mapPeru from '../components/mapPeru.vue'
import mapChile from '../components/mapChile.vue'
import mapBrasil from '../components/mapBrasil.vue'

export default {
  components: { 
    mapPeru,
    mapChile,
    mapBrasil
  },
  name: 'selectMap',
  props: {
  },
  data(){
    return {
      selectedMap: undefined,
    }
  },
  mounted() {
    this.selectedMap = this.$route.query.map;
  }
}
</script>

<style scoped>
</style>
