export default {
  state: {
    isCollapse: !!localStorage.getItem('isCollapse') // 是否叠收起菜单
  },
  mutations: {
    SET_COLLAPSE: (state, isCollapse) => {
      state.isCollapse = isCollapse
      localStorage.setItem('isCollapse', isCollapse)
    }
  },
  actions: {
    toggleCollapse ({ state, commit }) {
      commit('SET_COLLAPSE', !state.isCollapse)
    }
  }
}
