// 权限拦截在路由跳转    导航守卫

import router from '@/router'
import store from '@/store'
import nprogress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进度条样式

// 定义白名单
const whiteList = ['/login', '/404']

// 不需要导出  因为只需要让代码执行即可

// 前置守卫 - router.beforeEach()
// next是前置守卫 必须必须必须 执行的钩子
// 备注： next必须执行  如果不执行  页面就死了
// next()   -> 放过
// next(false)  -> 跳转终止
// next(地址)   -> 跳转到某个地址
router.beforeEach((to, from, next) => {
    // 开启进度条
    nprogress.start() 
    if (store.getters.token) {
        // 有 token
        if (to.path === '/login') {
            // 是否登录页
            next('/') // 是 - 跳转到主页
        } else {
            // 不是登录页
            next() // 放过 - 通行
        }
    } else {
        // 没 token
        if (whiteList.indexOf(to.path) > -1) {
            // 表示要去的地址 在白名单里
            next()  // 放过通行
        } else {
            // 表示要去的地址 不在白名单
            next('/login')  // 跳转登录页
        }
    }
})


// 后置守卫
router.afterEach(() => {
    // 关闭进度条
    nprogress.done()
})