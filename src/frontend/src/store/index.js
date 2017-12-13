import Vue from 'vue'
import Vuex from 'vuex'

import notification from './modules/notification'
import auth from './modules/auth'
import localStoragePlugin from './plugins/localStorage'
import menu from './modules/menu'
import app from './modules/app'

import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,  // process.env.NODE_ENV !== 'production',
  getters,
  modules: {
    notification,
    auth,
    menu,
    app
  },
  state: {},
  mutations: {},
  plugins: [localStoragePlugin]
})

export default store
