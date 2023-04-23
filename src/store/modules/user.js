import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'


// 状态
// 初始化的时候从缓存中读取状态 并赋值到初始化的状态上
// Vuex的持久化如何实现呢？ Vuex和前端缓存相结合 
const state = {
  // 设置token的共享状态
  // 设置token初始状态 token持久化 => 放到缓存中(浏览器)
  token:getToken()
}
// 修改状态
const mutations = {
  // 修改token
  setToken(state, token){
    // 设置token 只是修改state的数据
    // 例如： 123 -> 1234
    state.token = token
    // vuex变化 => 缓存数据
    // vuex和 缓存数据的同步
    setToken(token)
  },
  // 删除token
  removeToken(state){
    // 删除vuex中的token
    state.token = null
    // 先清除 vuex  再清除缓存
    // 实现 vuex 和 缓存数据的同步
    removeToken()
  }
  
}
// 执行异步
const actions = {
  // 定义 login action 
  async loginAction(context, data){
    // 实际上返回的就是一个 promise对象
    // result就是执行的结果
    const result = await login(data)
    // axios默认给数据 加了一层 data
    if(result.data.success){
      // 表示登录接口调用成功 也就意味着你的用户名和密码是正确的
      // 获取用户的token
      const token = result .data.data
      // 由于actions 修改state 必须通过mutations
      context.commit('setToken', token)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}