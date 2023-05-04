<template>
  <el-dialog title="新增员工" :visible="showDialog">
    <!-- 表单 -->
    <el-form :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门"
        @focus="getDepartmentsFn" />
        <!-- 放置一个树形组件 -->
        <el-tree v-if="showTree"
          :data="treeData" 
          :props="{label: 'name'}" 
          :default-expand-all="true" />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 来实现 底部的取消和确定按钮-->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small">取消</el-button>
        <el-button type="primary" size="small">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from "@/api/departments"
import { transListToTreeData } from '@/utils/index'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: ""
      },
      rules: {
        username: [
          { required: true, message: "用户姓名不能为空", trigger: "blur" },
          {
            min: 1,
            max: 4,
            message: "用户姓名为1-4位"
          }
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur"
          }
        ],
        formOfEmployment: [
          { required: true, message: "聘用形式不能为空", trigger: "blur" }
        ],
        workNumber: [
          { required: true, message: "工号不能为空", trigger: "blur" }
        ],
        departmentName: [
          { required: true, message: "部门不能为空", trigger: "change" }
        ],
        timeOfEntry: [{ required: true, message: "入职时间", trigger: "blur" }]
      },
      // 定义一个数组来接收树形结构的数据
      treeData:[],
      // 默认不显示树形组件
      showTree:false
    };
  },
  methods: {
    async getDepartmentsFn(){
      // 显示树形组件
      this.showTree = true
      const { depts } = await getDepartments()
      // depts是一个数组 它需要转化成树形结构 才可以被 el-tree 显示
      this.treeData = transListToTreeData(depts, '')
    }
  }
};
</script>

<style>
</style>