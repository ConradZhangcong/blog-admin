export default {
  state: {
    // loading: false, // 全局加载中状态
    flag: true,
    isCollapse: !!localStorage.getItem('isCollapse') // 是否叠收起菜单
  },
  mutations: {
    SET_FLAG: (state, value) => {
      state.flag = value
    },
    SET_COLLAPSE: (state, isCollapse) => {
      state.isCollapse = isCollapse
      localStorage.setItem('isCollapse', isCollapse)
    }
  },
  actions: {
    toggleCollapse ({ state, commit }) {
      if (state.flag) {
        commit('SET_COLLAPSE', !state.isCollapse)
        commit('SET_FLAG', false)
        setTimeout(() => {
          commit('SET_FLAG', true)
        }, 400)
      }
    }
  }
}
