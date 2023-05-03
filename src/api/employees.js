import request from '@/utils/request'

/**
 * 获取员工的简单列表
 */
export function getEmployeeSimplie() {
    return request({
        url: '/sys/user/simple'
    })
}

/**
 * 获取员工的综合列表数据
 */
export function getEmployeeList(params){
    return request({
        url:'/sys/user',
        method:'get',
        params
    })
}