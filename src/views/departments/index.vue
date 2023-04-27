<template>
  <div>
    <div class="app-container">
      <!-- 组织架构内容 - 头部 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <tree-tools :tree-node="company" :is-root="true" />
        <!-- 放置一个 el-tree -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据  data：每个节点的数据对象-->
          <tree-tools slot-scope="{data}" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from "./components/tree-tools";
import {getDepartments} from "@/api/departments"
import {transListToTreeData} from '@/utils/index'

export default {
  components: {
    TreeTools
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
      }
    };
  },
  created () {
    this.getDepartments()
  },
  methods: {
    async getDepartments(){
      const result = await getDepartments()
      console.log(result)
      this.company = {name:result.companyName, manager:'负责人'}
      this.departs = transListToTreeData(result.depts, '')
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