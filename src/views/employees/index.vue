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
            <el-table-column label="聘用形式" prop="formOfEmployment"
              :formatter="formatEmployment" />
            <el-table-column label="部门" prop="departmentName" />
            <el-table-column label="入职时间" prop="timeOfEntry" >
              <!-- 针对入职时间 采用作用域插槽 + 过滤器 -> 进行处理 -->
              <template slot-scope="{row}">
                {{row.timeOfEntry|formatDate}}
              </template>
            </el-table-column>
            <el-table-column label="账户状态" prop="enableState" >
              <template slot-scope="{row}">
                <!-- 根据当前状态来确定 是否打开 - 开关 -->
                <el-switch :value="row.enableState === 1"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" >
              <template slot-scope="{row}">
                <el-button type="text" size="small">查看</el-button>
                <el-button type="text" size="small"
                  @click="deleteEmployeeFn(row.id)">删除</el-button>
              </template>
            </el-table-column>
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
      <!-- 放置弹层 -->
      <AddEmployee />
  </div>
</template>

<script>
import {getEmployeeList, delEmployee} from '@/api/employees'
// 引入员工的枚举
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee'

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
  components: {
    AddEmployee
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
    },
    formatEmployment(row, column, cellValue, index){
      // debugger
      console.log('formatEmployment->')
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      console.log(obj)
      return obj ? obj.value : '未知'
    },
    // 删除员工
    async deleteEmployeeFn(id){
      try {
        await this.$confirm('您确定删除该员工吗？')
        await delEmployee(id)
        this.getEmployeeListFn()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>