import Layout from '@/layout'

export default {
    path:'/permission', // 路由地址  /permission
    component: Layout,
    name: 'permission',
    // 二级路由
    children:[
        {
            // 二级路由的 path什么都不写 
            // 表示是二级路由的默认路由
            path:'',
            component:() => import('@/views/permission'),
            name:'permission',
            meta: { 
                title:'权限设置',
                icon:'password',
             }
        }
    ]
}