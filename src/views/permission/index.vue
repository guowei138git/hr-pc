<template>
  <div class="app-container">
      <!-- 页面工具栏 -->
      <page-tools>
        <!-- 靠右的按钮 -->
        <template v-slot:after>
          <el-button type="primary" size="small">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table :data="list" border="" row-key="id">
        <el-table-column align="center" label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作" >
          <template>
            <el-button type="text">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增编辑弹层 -->
      <el-dialog :visible="showDialog" title="新增编辑"> 
        <!-- 表单 -->
        <el-form>
          <el-form-item label="名称">
            <el-input></el-input>
          </el-form-item>
             <el-form-item label="标识">
            <el-input></el-input>
          </el-form-item>
             <el-form-item label="描述">
            <el-input></el-input>
          </el-form-item>
             <el-form-item label="开启">
               <el-switch></el-switch>
          </el-form-item>
        </el-form>
      </el-dialog>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils'

export default {
  data () {
    return {
      list:[],
      showDialog: true
    }
  },
  created () {
    this.getPermissionListFn()
  },
  methods:{
    async getPermissionListFn(){
      const result = await getPermissionList()
      console.log('getPermissionListFn:', result)
      this.list = transListToTreeData(result, '0')
      console.log(this.list)
    }
  }

}
</script>

<style>

</style>