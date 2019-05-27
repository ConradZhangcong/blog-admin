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
    CLEAR_USER (state) {
      state.user = null
      state.token = null
      sessionStorage.clear('user')
      sessionStorage.clear('token')
    }
  },
  actions: {
    Login ({ commit, state }, user) {},
    Logout ({ commit, state }) {}
  }
}
