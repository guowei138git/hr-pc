<template>
  <div class="app-container">
    <el-card>
      <el-tabs>
        <el-tab-pane label="登录账户设置">
          <!-- 放置表单 -->
          <el-form
            label-width="120px"
            style="margin-left:120px; margin-top:30px"
            ref="userForm"
            :model="userInfo"
          >
            <el-form-item label="姓名" prop="username">
              <el-input style="width:300px" v-model="userInfo.username" />
            </el-form-item>
            <el-form-item label="原密码" prop="password">
              <el-input style="width:300px" v-model="userInfo.password" type="password" />
            </el-form-item>
            <el-form-item label="新密码" prop="password2">
              <el-input style="width:300px" v-model="userInfo.password2" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveUser">更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="个人详情">
          <!-- 放置个人详情 -->
          <UserInfo />
        </el-tab-pane>

        <el-tab-pane label="岗位信息"></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getUserDetailById } from "@/api/user";
import { saveUserDetailById } from "@/api/employees";
import UserInfo from "./components/user-info";

export default {
  components: {
    UserInfo
  },
  data() {
    return {
      userId: this.$route.params.id,
      userInfo: {
        username: "",
        password: "",
        password2: ""
      },
      rules: {}
    };
  },
  created() {
    this.getUserDetailByIdFn();
  },
  methods: {
    async getUserDetailByIdFn() {
      this.userInfo = await getUserDetailById(this.userId);
    },
    async saveUser() {
      try {
        // 将新密码的值替换原密码的值
        const data = { ...this.userInfo, password: this.userInfo.password2 };
        await saveUserDetailById(data);
        this.$message.success("保存成功");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
</style>