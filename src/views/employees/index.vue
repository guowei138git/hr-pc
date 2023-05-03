<template>
  <div class="dashboard-container">
      <div class="app-container">
        <!-- 放置通用工具栏 -->
        <page-tools :show-before="true">
          <span slot="before">共166条记录</span>
          <template slot="after">
            <el-button size="small" type="warning">导入</el-button>
            <el-button size="small" type="danger">导出</el-button>
            <el-button size="small" type="primary">新增员工</el-button>
          </template>
        </page-tools>
        <!-- 放置表格 -->
        <el-card v-loading="loading">
          <el-table border :data="list">
            <el-table-column label="序号" type="index"  />
            <el-table-column label="姓名" prop="username" />
            <el-table-column label="工号" prop="workNumber" />
            <el-table-column label="聘用形式" prop="formOfEmployment" />
            <el-table-column label="部门" prop="departmentName" />
            <el-table-column label="入职时间" prop="timeOfEntry" />
            <el-table-column label="账户状态" prop="enableState" />
            <el-table-column label="操作" fixed="right" />
          </el-table>
        </el-card>
      </div>
  </div>
</template>

<script>
import {getEmployeeList} from '@/api/employees'

export default {
  data () {
    return {
      loading:false,
      // 接收数据的list集合
      list:[],
      page:{
        page:1, // 当前页码
        size:10, // 每页显示的条数
        total:0 // 总数
      }
    }
  },
  created () {
    this.getEmployeeListFn()
  },
  methods: {
    async getEmployeeListFn(){
      this.loading = true
      const {total, rows} = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    }
  }
}
</script>

<style>

</style>