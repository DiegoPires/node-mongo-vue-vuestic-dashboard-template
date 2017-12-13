import axios from 'axios'
import { init } from '../plugins/localStorage'
import config from '@/helpers/config'

const state = {
  token: init
}

const mutations = {
  setToken (state, token) {
    state.token = token
  },
  resetToken (state) {
    state.token = ''
  }
}

const actions = {
  async login ({ commit }, user) {
    const endpoint = config.apiUrl + '/auth/login'
    const { data } = await axios.post(endpoint, user)

    axios.defaults.headers.common['token'] = data.token

    commit('setToken', data.token)
  },
  // async register ({ commit }, user) {
  //   const endpoint = config.apiUrl + '/auth/register'
  //   const { data } = await axios.post(endpoint, user)
  //   commit('setToken', data.token)
  // },
  logout ({ commit }) {
    commit('resetToken')
  }
}

const getPayload = ({ token }) => {
  const payload = token.split('.')[1]
  return JSON.parse(atob(payload))
}

const getters = {
  isLoggedIn (state) {
    if (!state.token || state.token === 'undefined') return false
    let payload = getPayload(state)
    return payload.exp > (Date.now() / 1000)
  },
  currentUser (state) {
    if (!state.token) return {}
    const { name, email } = getPayload(state)
    return { name, email }
  },
  token (state) {
    return state.token
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
