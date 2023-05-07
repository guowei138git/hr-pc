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
            :rules="rules"
          >
            <el-form-item label="用户名" prop="username">
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
          <!-- <UserInfo />  -->
          <!-- vuejs中 内置了一个组件 component 它可以时任何组件 -->
          <component :is="UserComponent" />
          <!-- 动态组件 可以切换组件 is必须时变量 -->
        </el-tab-pane>

        <el-tab-pane label="岗位信息">
            <!-- 放置岗位详情 -->
            <component :is=JobInfoComponent />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getUserDetailById } from "@/api/user";
import { saveUserDetailById } from "@/api/employees";
import UserInfo from "./components/user-info";
import JobInfo from "./components/job-info";

export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      UserComponent:'UserInfo',
      JobInfoComponent:'JobInfo',
      // params传参 - 动态路由传参
      // path:'detail/:id'
      userId: this.$route.params.id,
      userInfo: {
        username: "",
        password: "",
        password2: "" // 为什么叫password2 因为后端读取出来的password是密文
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 4, message: "用户名长度2-4位", trigger: "blur" }
        ],
        password2: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 9, message: "密码长度6-9位", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getUserDetailByIdFn();
  },
  methods: {
    async getUserDetailByIdFn() {
      this.userInfo = await getUserDetailById(this.userId);
    },
    saveUser() {
      // 调用保存方法之前 需先校验 - 校验表单中输入的 value
      this.$refs.userForm.validate().then(async () => {
        try {
          // 将新密码的值替换原密码的值 password = password2
          // ...userInfo：属于浅拷贝  在这个对象里已有password 所以用后面的password来覆盖userInfo里面的password
          // 类似于：{a:1, a:2} ---> {a:2}
          const data = { ...this.userInfo, password: this.userInfo.password2 };
          await saveUserDetailById(data);
          this.$message.success("保存成功");
        } catch (error) {
          console.log(error);
        }
      });
    }
  }
};
</script>

<style>
</style>