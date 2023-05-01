import request from '@/utils/request'

/**
 * 封装获取组织架构的数据-api
 */
export function getDepartments(){
    return request({
        url:'/company/department'
    })
}

/**
 * 封装删除组织架构的部门-api
 */
export function delDepartments(id){
    return request({
        url:`/company/department/${id}`,
        method:'delete'
        // 接口满足 restful规范
        /**
         * 同样的地址 不同的方法  执行不同的业务
         * delete 删除业务
         * get 获取业务
         * post 新增或添加业务
         * put 修改业务
         */
    })
}

/**
 * 新增部门
 */
export function addDepartments(data){
    return request({
        url:'/company/department', // restful接口规范
        method:'POST',
        data // axios的body参数 data
    })
}

/**
 * 获取部门详情
 */
export function getDepartDetail(id){
    return request({
        url:`/company/department/${id}`,
        method:'GET'
    })
}

/**
 * 封装编辑部门接口
 */
export function updateDepartments(data){
    return request({
        url:`/company/department/${data.id}`,
        method:'PUT'
    })
}