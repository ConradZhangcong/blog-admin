import { asyncRoutes } from '@/router'

export default {
  state: {
    routes: asyncRoutes
  },
  mutations: {
    SET_ROUTERS: (state, payload) => {
      state.routes = payload.routes
    }
  },
  actions: {}
}
