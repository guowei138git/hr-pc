//导出 一个axios的实例 而且这个实例要有请求拦截器和响应拦截器
import axios from 'axios' // 引入 axios

// 创建一个axios的实例
const service = axios.create({
    // 当执行 npm run dev => .env.development => /api
    // 当执行 npm run build => .env.production => /prod-api
    baseURL: process.env.VUE_APP_BASE_API,
    // 设置超时时间 5s
    timeout:5000
}) 

service.interceptors.request.use() // 请求拦截器
service.interceptors.response().use() // 响应拦截器
export default service // 导出axios实例