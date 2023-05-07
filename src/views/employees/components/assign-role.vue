<template>
  <el-dialog title="分配角色" :visible="showRoleDialog">
    <!-- el-checkbox-group选中的是 当前用户所拥有的角色
    需要绑定 - 当前用户的角色数据-->
    <el-checbox-group>
      <!-- 选项数据 -->
      <el-checkbox v-for="item in list"
      :key="item.id"
      :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checbox-group>
    <!-- 定义footer的插槽 -->
    <el-row>
      <el-col>
        <el-button size="small" type="primary">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from "@/api/setting";

export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 角色列表
      list: []
    };
  },
  created() {
    this.getRoleListFn();
  },
  methods: {
    // 获取所有角色 - 列表
    async getRoleListFn() {
      const { rows } = await getRoleList();
      console.log('roleList:', rows)
      this.list = rows
    }
  }
};
</script>

<style>
</style>