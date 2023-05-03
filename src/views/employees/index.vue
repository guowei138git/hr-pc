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
        <el-card>
          <el-table>
            <el-table-column label="序号"  />
            <el-table-column label="姓名"  />
            <el-table-column label="工号"  />
            <el-table-column label="聘用形式"  />
            <el-table-column label="部门"  />
            <el-table-column label="入职时间"  />
            <el-table-column label="账户状态"  />
            <el-table-column label="操作"  />
          </el-table>
        </el-card>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>