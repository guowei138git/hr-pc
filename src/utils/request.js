//导出 一个axios的实例 而且这个实例要有请求拦截器和响应拦截器
import axios from 'axios' // 引入 axios
import store from '@/store' // 引入 sotre
import { Message } from 'element-ui'

// 创建一个axios的实例
const service = axios.create({
    // 当执行 npm run dev => .env.development => /api
    // 当执行 npm run build => .env.production => /prod-api
    baseURL: process.env.VUE_APP_BASE_API,
    // 设置超时时间 5s
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => {
    // 统一注入token
    if (store.getters.token) {
        // 如果token存在 注入 token
        config.headers['Authorization'] = `Bear ${store.getters.token}`
    }
    // 必须返回配置
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
    // 成功 -> 解构数据
    const { success, message, data } = response.data
    // 判断 success 
    if (success) {
        // 是 成功 -> 返回data
        return data
    } else {
        // 否 失败 -> 提示错误
        Message.error(message)
        // 返回 reject
        return Promise.reject(new Error(message))
    }
}, error => {
    // 失败 -> 提示错误
    Message.error(error.message)
    // reject 返回执行错误 让当前的执行链跳出成功 直接进入 catch
    return Promise.reject(error)
})

export default service // 导出axios实例