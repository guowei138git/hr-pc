<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 放置内容 -->
      <el-card>
        <!-- 表格数据 -->
        <el-tabs>
          <el-tab-pane label="角色管理">
            <!-- 左侧的内容 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                type="primary"
                size="small"
                @click="showDialog=true"
              >新增角色</el-button>
            </el-row>
            <!-- 给表格绑定数据 -->
            <el-table border :data="list">
              <el-table-column label="序号" width="120" align="center" type="index" />
              <el-table-column label="名称" width="240" align="center" prop="name" />
              <el-table-column label="描述" align="center" prop="description" />
              <el-table-column label="操作" align="center">
                <!-- 作用域插槽 -->
                <template slot-scope="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteRoleFn(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 放置分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height:60px">
              <el-pagination
                :current-page="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                layout="prev,pager,next"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>

          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              :closable="false"
              type="info"
              show-icon
            />
            <!-- 右边内容 -->
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="formData.name" disabled style="400px"></el-input>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="400px"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="400px"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="formData.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="400px"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 放置一个弹层组件 -->
    <el-dialog title="编辑部门" :visible="showDialog" @close="btnCancel">
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <!-- 放置footer插槽 -->
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-button type="primary" size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleList,
  getCompanyInfo,
  deleteRole,
  getRoleDetail,
  updateRole,
  addRole
} from "@/api/setting";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // 承接数组
      list: [],
      // 放置页面分页 - 相关数据
      page: {
        page: 1,
        pagesize: 10,
        total: 0 // 记录总数
      },
      // 公司信息 - formData对象接收
      formData: {},
      // 控制 - 弹层显示
      showDialog: false,
      roleForm: {
        name: "",
        description: ""
      },
      rules: {
        name: [{ required: true, message: "角色名称不能为空", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["companyId"])
  },
  created() {
    this.getRoleListFn();
    this.getCompanyInfoFn();
  },
  methods: {
    async getRoleListFn() {
      const { total, rows } = await getRoleList(this.page);
      console.log("total=", total);
      this.page.total = total;
      this.list = rows;
    },
    changePage(newPage) {
      // newPage：当前点击的页面
      console.log("newPage=", newPage);
      // 将当前页面赋值 给当前的最新页码
      this.page.page = newPage;
      this.getRoleListFn();
    },
    // 获取公司信息
    async getCompanyInfoFn() {
      const companyId = this.companyId;
      console.log("companyId=", companyId);
      this.formData = await getCompanyInfo(companyId);
    },
    // 删除角色
    async deleteRoleFn(id) {
      try {
        // 弹框 - 提示
        await this.$confirm("确认删除该角色吗？");
        // 只有点击了 - 确定 -> 菜能进入到下方
        await deleteRole(id); // 调用删除接口
        // 重新加载数据
        this.getRoleListFn();
        this.$message.success("删除角色成功");
      } catch (error) {
        console.log(error);
      }
    },
    async editRole(id) {
      this.roleForm = await getRoleDetail(id);
      this.showDialog = true; // 为了不出现闪烁 先获取数据 再弹出层
    },
    // 点击确定 - 触发
    btnOK() {
      console.log("确定->btnOK");
      this.$refs.roleForm.validate(async isOK => {
        if (isOK) {
          // 这里需要提前考虑： 新增的场景
          if (this.roleForm.id) {
            // 编辑场景
            await updateRole(this.roleForm);
          } else {
            // 新增场景
            await addRole(this.roleForm);
          }
          // 重新拉取数据
          this.getRoleListFn();
          // 弹框提示
          this.$message.success("操作成功");
          // 关闭弹层
          this.showDialog = false;
        }
      });
    },
    // 取消按钮 - 触发
    btnCancel() {
      this.roleForm = {
        name: "",
        description: ""
      };
      // 移除校验
      this.$refs.roleForm.resetFields();
      this.showDialog = false;
    }
  }
};
</script>

<style>
</style>