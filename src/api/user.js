import request from '../utils/request'
// 登录
const login = (data) => {
  return request({
    url: '/admin/login',
    method: 'POST',
    data
  })
}
// 用户信息
const getUserInfo = () => {
  return request({ url: '/admin/getinfo', method: 'POST' })
}
export default {
  login,
  getUserInfo
}
