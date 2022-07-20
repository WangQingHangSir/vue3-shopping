import UserApi from '../../api/user'
import { getItem, setItem, removeItem } from '../../utils/storage'
export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    userInfo: {},
    menus: [],
    ruleNames: [],
    isCollapse: false
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    getUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setMenu(state, menus) {
      state.menus = menus
    },
    setRuleNames(state, ruleNames) {
      state.ruleNames = ruleNames
    },
    setCollapse(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {
    // 登录
    async login({ commit }, payload) {
      const response = await UserApi.login(payload)
      commit('setToken', response.token)
      return response
    },
    // 用户信息
    async getUserInfo({ commit }) {
      console.log(2)
      const response = await UserApi.getUserInfo()
      commit('getUserInfo', response)
      commit('setMenu', response.menus)
      commit('setRuleNames', response.ruleNames)
      console.log(response)
      return response
    },
    // 退出
    logout({ commit }) {
      commit('setToken', '')
      commit('getUserInfo', '')
      removeItem('token')
      removeItem('userInfo')
    }
  }
}
