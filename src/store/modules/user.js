import { login } from '@/api/user'

export default {
  state: {
    user: JSON.parse(sessionStorage.getItem('user')),
    token: sessionStorage.getItem('token')
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
      sessionStorage.setItem('token', token)
    },
    SET_USER (state, user) {
      state.user = user
      sessionStorage.setItem('user', JSON.stringify(user))
    },
    CLEAR_TOKEN (state) {
      state.token = null
      sessionStorage.clear('token')
    },
    CLEAR_USER (state) {
      state.user = null
      sessionStorage.clear('user')
    }
  },
  actions: {
    LoginByUsername ({ commit, state }, form) {
      return login(form).then(res => {
        commit('SET_TOKEN', res.data.token)
        commit('SET_USER', res.data.user)
        return res.data.user
      })
    },
    Logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('CLEAR_TOKEN')
        commit('CLEAR_USER')
        resolve()
      })
    }
  }
}
