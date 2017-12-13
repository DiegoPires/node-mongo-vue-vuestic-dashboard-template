// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import App from './App'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import VuesticPlugin from 'src/components/vuestic-components/vuestic-components-plugin'
import Vuelidate from 'vuelidate'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'

import 'pace-js/themes/blue/pace-theme-flat-top.css'
import pace from 'pace-js/pace.min.js'
import axios from 'axios'

Vue.use(VueLodash, lodash)
Vue.use(VueMomentJS, moment)
Vue.use(VuesticPlugin)
Vue.use(BootstrapVue)
Vue.use(Vuelidate)

// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, {fieldsBagName: 'formFields'})

sync(store, router)

let mediaHandler = () => {
  // if (window.matchMedia(store.getters.config.windowMatchSizeLg).matches) {
  //   store.dispatch('toggleSidebar', true)
  // } else {
  //   store.dispatch('toggleSidebar', false)
  // }
  store.dispatch('toggleSidebar', false)
}

router.beforeEach((to, from, next) => {
  store.commit('setLoading', true)
  next()
})

router.afterEach((to, from) => {
  mediaHandler()
  store.commit('setLoading', false)
})

axios.interceptors.request.use(function (config) {
  store.commit('incrementNumberOfAjaxCAllPending', 1)
  pace.start()

  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  store.commit('decreaseNumberOfAjaxCAllPending', 1)

  let numberOfAjaxCAllPending = store.getters['numberOfAjaxCAllPending']
  if (numberOfAjaxCAllPending === 0) {
    pace.stop()
  }
  return response
}, function (error) {
  let numberOfAjaxCAllPending = store.getters['numberOfAjaxCAllPending']
  if (numberOfAjaxCAllPending === 0) {
    pace.stop()
  }
  return Promise.reject(error)
})

axios.defaults.headers.common['Authorization'] = store.getters['auth/token']

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
