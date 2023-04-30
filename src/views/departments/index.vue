<template>
  <div>
    <div class="app-container">
      <!-- 组织架构内容 - 头部 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <tree-tools :tree-node="company" :is-root="true" 
        @addDepts="addDepts"
        />
        <!-- 放置一个 el-tree -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据  data：每个节点的数据对象-->
          <tree-tools slot-scope="{data}" :tree-node="data"
          @delDepts="getDepartments"
          @addDepts="addDepts"
          @editDepts="editDepts"
           />
        </el-tree>
      </el-card>
    </div>
    <!-- 放置新增弹层组件 -->
    <!-- 父组件 sync修饰符 只要用sync修饰符 就可以省略父组件的监听和方法  可以直接赋值给showDialog -->
    <add-dept :show-dialog.sync=showDialog 
    :tree-node="node" 
    @addDepts="getDepartments" 
    ref="addDeptComponent"/>
  </div>
</template>

<script>
import TreeTools from "./components/tree-tools";
import AddDept from './components/add-dept' // 引入新增部门组件
import {getDepartments} from "@/api/departments"
import {transListToTreeData} from '@/utils/index'

export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      company: {},
      departs: [
        {
          name: "总裁办",
          manager: "曹操",
          children: [{ name: "董事会", manager: "曹丕" }]
        },
        {
          name: "行政部",
          manager: "刘备"
        },
        {
          name: "人事部",
          manager: "孙权"
        }
      ],
      defaultProps: {
        label: "name", // 表示 从这个树形显示内容
        children: "children" // 表示 从这个树形去找子节点
      },
      // 定义控制窗体显示的变量： showDialog
      showDialog: false, // 默认不显示弹层
      node:null // 记录当前点击的node节点
    };
  },
  created () {
    this.getDepartments()
  },
  methods: {
    async getDepartments(){
      const result = await getDepartments()
      console.log(result)
      this.company = {name:result.companyName, manager:'负责人',id:''}
      this.departs = transListToTreeData(result.depts, '')
    },
    // 监听tree-tools中触发的点击 - 添加子部门的 事件
    // node 是我们点击的部门
    addDepts(node){
      this.showDialog = true // 显示弹层
      this.node = node
    },
    // 编辑部门
    editDepts(node){
      // 显示弹层
      this.showDialog = true
      // 赋值操作的节点
      this.node = node
      // $refs.addDeptComponent - 可以获取到组件 addDeptComponent：add-dept的实例
      // 那既然可以获取到实例 - 就可以获取这个实例下的方法
      this.$refs.addDeptComponent.getDepartDetail(node.id)
    }
  }
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>