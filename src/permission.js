import router from './router'
import store from './store'
import { filterMenus } from './utils/router'
const whitelList = ['/login']
router.beforeEach(async (to, from, next) => {
  // 获取token
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      next(from.path)
    } else {
      if (!store.getters.hasUserInfo) {
        const response = await store.dispatch('user/getUserInfo')
        if (response) {
          const menus = filterMenus(store.getters.menus)
          console.log(menus)
          menus.forEach((item) => {
            router.addRoute('layout', item)
          })
          return next(to.path)
        } else {
          next('/login')
        }
      }
      next()
    }
  } else {
    if (whitelList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
