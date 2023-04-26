import Cookies from 'js-cookie'

// 设置一个独一无二的 key 
const TokenKey = 'hrsaas-ihrm-token'

// 时间戳的 key 
const timeKey = 'hrsaas-timestamp-key'

/**
 * 获取token
 */
export function getToken() {
  return Cookies.get(TokenKey)
}

/**
 * 存储token
 * @param {*} token 
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

/**
 * 删除token
 */
export function removeToken() {
  return Cookies.remove(TokenKey)
}

/**
 * 获取时间戳
 */
export function getTimeStamp(){
  return Cookies.get(timeKey)
}

/**
 * 设置时间戳
 */
export function setTimeStamp(){
  Cookies.set(timeKey, Date.now())
}
