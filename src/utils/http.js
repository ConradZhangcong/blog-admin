import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// import config from '@/config'
// console.log(config)
// console.log(process.env)

const instance = axios.create({
  baseURL: 'http://127.0.0.1:9705',
  timeout: 5000
})

// 请求拦截 request
instance.interceptors.request.use(
  config => {
    const token = store.getters.token
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    console.log('request error: ' + error)
    Promise.reject(error)
  }
)

// 响应拦截器 response 请求服务器成功
instance.interceptors.response.use(
  // 请求接口成功
  response => {
    const result = response.data
    if (result.code === 200) {
      return Promise.resolve(result)
    } else if (result.code === 0) {
      Message({
        message: result.msg,
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject(result)
    } else {
      return Promise.reject(response)
    }
  },
  // 请求接口失败
  error => {
    if (error) {
      Message({
        message: '服务器繁忙',
        type: 'error',
        duration: 2 * 1000
      })
      // console.log(error.response)
      // errorHandle(error.response.status)
      return Promise.reject(error)
    }
  }
)

export default instance
