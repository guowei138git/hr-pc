<template>
  <div class="login-container">
    <!-- 绑定model属性 :model="loginForm" 
        绑定rules规则  :rules="loginRules" -->
    <el-form ref="loginForm" 
    :model="loginForm" 
    :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <!-- 放置标题图片 -->
      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/login-logo.png" alt="">
        </h3>
      </div>
      <!-- 给(el-form-item)设置 prop属性-mobile -->
      <el-form-item prop="mobile">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <!-- 给el-input加v-modle绑定属性
        loginForm.mobile(双向绑定) -->
        <el-input
          ref="username"
          v-model="loginForm.mobile"
          placeholder="请输入手机号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <!-- 给(el-form-item)设置 prop属性-password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <!-- 给el-input加v-modle绑定属性
        loginForm.password(双向绑定) -->
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <!-- .enter属于按键修饰符
             .native表示监听组件的原生事件
             比如：keyup就是input的原生事件
             这里写native表示keyup是一个原生事件，而非组件的事件 -->
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button class="loginBtn"
      :loading="loading" 
      type="primary" 
      style="width:100%;margin-bottom:30px;" 
      @click.native.prevent="handleLogin">
      登录</el-button>

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->

      <!-- 修改显示的提示文本和登录文本 -->
      <div class="tips">
        <span style="margin-right:20px;">账号: 13800000002</span>
        <span> 密码: 123456</span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validateMobileFn } from '@/utils/validate'
// 引入vuex的辅助函数
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!validateMobileFn(value)) {
        const errMsg = '手机号格式不正确'
        callback(new Error(errMsg))
      } else {
        callback()
      }
    }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      // 绑定 model属性
      loginForm: {
        mobile: '13800000002',
        password: '123456'
      },
      // 绑定 rules规则
      loginRules: {
        // trigger 校验的触发方式
        // blur 失去焦点触发
        // validator 自定义函数 - validateUsername
        mobile: [{ required: true, trigger: 'blur', message:'手机号不能为空' },
          {
            validator: validateMobile, trigger: 'blur'
          }
        ],
        // 密码校验
        password: [{ required: true, trigger: 'blur', message:'密码不能为空' }, {
          trigger: 'blur', min: 6, max: 16, message: '密码长度为6-16位之间'
        }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    // 引入方法 - login
    ...mapActions(['user/login']),
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      // ref 可以获取到一个元素的dom对象
      // ref 作用到组件上的时候 可以获取到该组件的实例  this
      // 表单的手动校验 - validate
      this.$refs.loginForm.validate( async isOK => {
        // 判断接口调用是否 成功
        if (isOK) {
          try {
            // 开启 loading 
            this.loading = true
            // 只有校验通过了  我们才去调用 action
            await this['user/login'](this.loginForm)
            console.log('user/login -> success')
            // 跳转到 - 首页
            this.$router.push('/')
          } catch (error) {
            console.log('接口调用失败:', error)
          } finally {
            // 无论执行 try 还是 catch 都去关闭 loading 
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
// $light_gray:#fff;
$light_gray:#68b0fe; // 输入框颜色改成蓝色
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  // 设置背景图片
  background-image: url('~@/assets/common/login.jpg');
  // 将图片位置设置为充满整个屏幕
  background-position: center;

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }

  // 设置错误信息的颜色
  .el-form-item__error {
    color: #fff;
  }
  // 设置登录按钮的样式
  .loginBtn {
    background: #407ffe;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
