import { getToken, setToken, removeToken } from '@/utils/auth'


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
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}