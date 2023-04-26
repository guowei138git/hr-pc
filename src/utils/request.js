//导出 一个axios的实例 而且这个实例要有请求拦截器和响应拦截器
import axios from 'axios' // 引入 axios
import store from '@/store' // 引入 sotre
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'

const TimeOut = 3600 // 定义超时时间

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
    // console.log('统一注入token')
    // 注入token
    if (store.getters.token) {

        // 只有当token存在的情况下 才有必要去检查时间戳是否超时
        if (IsCheckTimeOut()) {
            // 如果它为true 表示过期了
            // 那么token没用了 因为超时了 -> 退出登录
            store.dispatch('user/logout')
            // 然后 -> 跳转到登录页
            router.push('/login')
            return Promise.reject(new Error('token超时了'))
        }

        // console.log('存在token')
        // 如果token存在 注入 token
        config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    // 必须返回配置
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
    // 成功 -> 解构数据  由于axios默认加了一层data
    const { success, message, data } = response.data
    // 判断 success 的成功与否决定下面的操作
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

    // error信息 里面的 response对象
    if (error.response && error.response.data
        && error.response.data.code === 10002) {
        // 当返回 10002的时候 表示 后端告诉我们 token超时了
        store.dispatch('user/logout') // 退出action  删除token
        // 跳转到登录页
        router.push('/login')
    } else {
        // 失败 -> 提示错误信息
        Message.error(error.message)

    }
    // reject 返回执行错误 让当前的执行链跳出成功 直接进入 catch
    return Promise.reject(error)
})


/**
 * 是否超时函数
 * 超时逻辑： ( 当前时间 - 缓存中的时间 ) 是否大于 时间差
 * 时间差：定义超时时间
 * return boolean
 */
function IsCheckTimeOut() {
    let currentTime = Date.now() // 当前时间戳
    let timeStamp = getTimeStamp() // 缓存时间戳
    return (currentTime - timeStamp) / 1000 > TimeOut
}

export default service // 导出axios实例