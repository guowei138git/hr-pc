import request from '@/utils/request'

/**
 * 登录接口封装
 * @param {*} data 
 */
export function login(data) {
  // 返回一个axios对象 => promise
  return request({
      // 因为所有的接口都要跨域，表示所有的接口都带 /api
      url: 'sys/login',
      method: 'post',
      // 请求体参数
      data
  })
}

/**
 * 获取用户信息接口封装
 * @param {*} token 
 * @returns data
 */
export function getUserInfo(){
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/**
 * 获取某个用户的基本信息
 * @param {String} id 
 */
export function getUserDetailById(id){
  return request({
    url: `/sys/user/${id}`
  })
}

/**
 * 保存员工的基本信息
 * @param {Object} data 
 */
export function saveUserDetailById(data){
  return request({
    url:`/sys/user/${data.id}`,
    method:'post',
    data:data
  })
}

export function logout() {
  
}
