import axios from 'axios'
import store from '../store'
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 超时时间
})

instance.interceptors.request.use(
  (config) => {
    const token = store.getters.token
    if (token) config.headers.token = token

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
// 响应拦截
instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data.data
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
function request(options) {
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  return instance(options)
}

export default request
