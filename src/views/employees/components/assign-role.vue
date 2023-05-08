<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <!-- el-checkbox-group选中的是 当前用户所拥有的角色
    需要绑定 - 当前用户的角色数据 
    多选框组 v-model双向绑定 -->
    <el-checkbox-group v-model="roleIds">
      <!-- 要循环的选项数据 -->
      <el-checkbox v-for="item in list" 
      :key="item.id" 
      :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <!-- 定义footer的插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" type="primary"
        @click="btnOK">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from "@/api/setting";
import { getUserDetailById } from "@/api/user";
import { asssignRoles } from '@/api/employees';

export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      // 角色列表
      list: [],
      // 当前用户的角色
      roleIds: []
    };
  },
  created() {
    this.getRoleListFn();
    // this.getUserDetailByIdFn(this.userId);
  },
  methods: {
    // 获取所有角色 - 列表
    async getRoleListFn() {
      // 默认获取20条数据  角色梳理不会太多   
      const data = {page:1, pagesize:20}
      const { rows } = await getRoleList( data );
      console.log("roleList:", rows);
      this.list = rows;
    },
    // 这个方法是什么时候调用？props传值是异步的 所以这里不能用this.userId
    // 这个方法是给父组件调用的
    async getUserDetailByIdFn(id) {
      // 获取当前用户的 角色 
      const { roleIds } = await getUserDetailById(id);
      console.log('roleIds:', roleIds)
      // 赋值 - 本用户的角色
      this.roleIds = roleIds;
    },
    // 点击 确定按钮  - 触发
    async btnOK(){
        console.log('btnOK---start')
        const data = {id: this.userId, roleIds: this.roleIds}
        await asssignRoles(data)
        // 关闭弹层  方法：-> 调用父组件中的方法update 
        // 目的：子组件可以改变父组件中(showRoleDialog)的值 
        // 说明： update是固定写法  和修饰符 .sync配合使用 
        this.$emit('update:showRoleDialog', false)
        this.$message.success('操作成功')
        console.log('btnOK---end')
    },
    btnCancel(){
        this.showRoleDialog = false
    }
  }
};
</script>

<style>
</style>