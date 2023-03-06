import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import de icons, adicionar no objeto do import */
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import router from './router'

/* lista de ícones - adicionar na library após import */
library.add(faFilter)

createApp(App).use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
