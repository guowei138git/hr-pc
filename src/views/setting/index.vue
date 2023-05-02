<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 放置内容 -->
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <!-- 左侧的内容 -->
            <el-row style="height:60px">
              <el-button icon="el-icon-plus" type="primary" size="small">新增角色</el-button>
            </el-row>
            <el-table border>
              <el-table-column label="序号">1</el-table-column>
              <el-table-column label="名称">2</el-table-column>
              <el-table-column label="描述">3</el-table-column>
              <el-table-column label="操作">
                <el-button>分配权限</el-button>
                <el-button>编辑</el-button>
                <el-button>删除</el-button>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height:60px">
              <el-pagination layout="prev,pager,next"></el-pagination>
            </el-row>
          </el-tab-pane>

          <el-tab-pane label="公司信息">
            <!-- 右边内容 -->
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input disabled style="400px"></el-input>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input disabled style="400px"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input disabled style="400px"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="3" disabled style="400px"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>