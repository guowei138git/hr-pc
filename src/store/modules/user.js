import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'


// 状态
// 初始化的时候从缓存中读取状态 并赋值到初始化的状态上
// Vuex的持久化如何实现呢？ Vuex和前端缓存相结合 
const state = {
  // 设置token的共享状态
  // 设置token初始状态 token持久化 => 放到缓存中(浏览器)
  token:getToken(),
  // 这里定义了一个空对象 
  userInfo:{} // 那为什么要定义空对象呢？
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
  },
  // 设置用户信息
  setUserInfo(state, result){
    console.log('result=', result)
    // 更新一个对象
    state.userInfo = result // 这里是响应式
    // console.log('setUserInfo - result')
    //state.userInfo = {...result} // 这样也是响应式 属于浅拷贝
    console.log('state.userInfo=', state.userInfo)
    //state.userInfo['username'] = result // 这样才不是响应式
  },
  // 删除用户信息
  removeUserInfo(state){
    state.userInfo = {}
  }
  
}
// 执行异步
const actions = {
  // 定义 login action 方法
  async login(context, data){
    // 调用api接口 拿到 - token
    const result = await login(data)
    // 设置token
    context.commit('setToken', result)
  },
  // 获取用户资料action
  async getUserInfoAction(context){
    // 调用api接口 
    // console.log('getUserInfoAction req')
    const result = await getUserInfo() // 获取返回值
    // console.log('getUserInfoAction res:', result)
    const baseInfo = await getUserDetailById(result.userId)
    context.commit('setUserInfo', {...result, ...baseInfo}) // 提交到mutations
    return result // 这里为什么要 return呢？
    // 这里给我们后期做权限的时候  留下伏笔
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}