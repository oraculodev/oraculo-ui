import { createApp } from 'vue'
import App from './App.vue'
import * as EvaIcons from '@stefandesu/eva-icons-vue'
import router from './router'
import BootstrapVue3 from 'bootstrap-vue-3'
import vClickOutside from 'click-outside-vue3'
import Loading from './components/loading'
import VueApexCharts from 'vue3-apexcharts'
import 'sweetalert2/dist/sweetalert2.min.css'
import '@vueform/slider/themes/default.css'
import './assets/scss/custom/plugins/mermaid.min.css'
import { createGtm } from 'vue-gtm'
import store from './state/store'
import InstantSearch from 'vue-instantsearch/vue3/es'

import './assets/scss/app.scss'

createApp(App)
  .use(
    createGtm({
      id: process.env.VUE_APP_GTM,
      vueRouter: router,
      trackOnNextTick: false,
    }),
  )
  .use(InstantSearch)
  .use(store)
  .use(EvaIcons)
  .use(router)
  .use(BootstrapVue3)
  .use(VueApexCharts)
  .use(vClickOutside)
  .component('Loading', Loading)
  .mount('#app')
