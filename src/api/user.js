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

export function getInfo(token) {
  
}

export function logout() {
  
}
