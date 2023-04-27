import Layout from '@/layout'



// 导出属于组织架构的路由规则
export default {
    path:'/departments', // 路径
    name:'departments', // 给路由规则加一个name
    component:Layout, // 组件
    // 配置二级 - 路由表
    children:[{
        path: '', //这是当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
        component:() => import('@/views/departments'),
        // 路由元信息 其实就是存储数据的对象  我们可以在这里放置一些信息
        meta: { 
            // meta 属性里面的属性  随意定义
            title:'组织架构', // 但是这里为什么使用title呢？
            // 因为 左侧导航栏会读取我们路由里的meta属性里面的title来作为显示菜单名称
            icon: 'tree' // 设置菜单图标
         }
    }]
}