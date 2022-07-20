export default {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  isCollapse: (state) => state.user.isCollapse,
  menus: (state) => state.user.menus
}
