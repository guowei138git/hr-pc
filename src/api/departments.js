import request from '@/utils/request'

/**
 * 封装获取组织架构的数据-api
 */
export function getDepartments(){
    return request({
        url:'/company/department'
    })
}