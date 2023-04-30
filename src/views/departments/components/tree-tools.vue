<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
    <el-col>
      <!-- 左侧内容 -->
      <span>{{treeNode.name}}</span>
    </el-col>
    <el-col :span="4">
      <!-- 右侧内容 -->
      <el-row type="flex" justify="end">
        <el-col>{{treeNode.manager}}</el-col>
        <el-col>
          <!-- 放置下拉菜单 -->
          <el-dropdown @command="operateDepts">
            <span class="el-dropdown-link">
              操作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import {delDepartments} from '@/api/departments'
export default {
  props: {
    //定义传入的树形
    treeNode: {
      required: true,
      type: Object
    },
    isRoot:{
        type:Boolean,
        default:false
    }
  },
  methods: {
    operateDepts(type){
      if (type === 'add') {
        // 添加子部门
        // 在当前点击的部门下  添加子部门 => this.treeNode 就是当前点击的部门
        // 触发自定义事件addDepts 告诉父组件 显示弹层
        this.$emit('addDepts', this.treeNode) // 为何传出treeNode 因为是添加子部门 需要当前部门的数据
      } else if (type === 'edit') {
        // 编辑部门
        // 调用父组件的编辑方法 - editDepts
        // 触发自定义事件 editDepts 告诉父组件 显示弹层
        this.$emit('editDepts', this.treeNode)
      } else {
        // 删除部门
        // alert('--删除')
        this.$confirm('确定要删除该部门吗？').then(()=>{
          // 如果点击了确认就会进入 then
          return delDepartments(this.treeNode.id) // 返回promise对象
        }).then(() => {
          // 如果删除成功了  就会进入这里
          this.$emit('delDepts') // 触发自定义事件
          this.$message.success('删除部门成功')
        })
      }
    }
  }
};
</script>

<style>
</style>