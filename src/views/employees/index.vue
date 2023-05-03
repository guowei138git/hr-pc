<template>
  <div class="dashboard-container">
      <div class="app-container">
        <!-- 放置通用工具栏 -->
        <page-tools :show-before="true">
          <span slot="before">共{{page.total}}条记录</span>
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
          <!-- 放置分页组件 -->
          <el-row type="flex" justify="center" align="middle" style="height:60px">
            <el-pagination layout="prev,pager,next" 
              :current-page="page.page"
              :page-size="page.size"
              :total="page.total"
              @current-change="changePageFn"
            />
          </el-row>
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
        size:5, // 每页显示的条数
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
    },
    changePageFn(newPage){
      console.log('newPage:',newPage)
      // 赋值当前最新页码
      this.page.page = newPage
      // 重新拉取数据
      this.getEmployeeListFn()
    }
  }
}
</script>

<style>

</style>