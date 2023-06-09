<template>
  <el-dialog title="新增员工" :visible="showDialog">
    <!-- 表单 -->
    <el-form ref="addEmployee" :model="formData" :rules="rules" label-width="120px">
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
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择" >
          <!-- 遍历组件中的数据 EmployeeEnum.hireType -->
          <el-option v-for="item in EmployeeEnum.hireType"
          :key="item.id"
          :label="item.value"
          :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门"
        @focus="getDepartmentsFn" />
        <!-- 放置一个树形组件 -->
        <el-tree v-if="showTree"
          v-loading="loading"
          :data="treeData" 
          :props="{label: 'name'}" 
          :default-expand-all="true"
          @node-click="selectNode" />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 来实现 底部的取消和确定按钮-->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small"
        @click="btnCancel">取消</el-button>
        <el-button type="primary" 
        size="small" @click="btnOK">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from "@/api/departments"
import { transListToTreeData } from '@/utils/index'
import EmployeeEnum from '@/api/constant/employees'
import { addEmployee } from '../../../api/employees';

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 员工的枚举数据
      EmployeeEnum: EmployeeEnum,
      // form表单的数据
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
      showTree:false,
      // 加载进度条
      loading:false
    };
  },
  methods: {
    async getDepartmentsFn(){
      // 显示树形组件
      this.showTree = true
      // 显示进度条
      this.loading = true
      const { depts } = await getDepartments()
      // depts是一个数组 它需要转化成树形结构 才可以被 el-tree 显示
      this.treeData = transListToTreeData(depts, '')
      // 关闭进度条
      this.loading = false
    },
    // 点击部门时 - 触发
    selectNode(node){
      this.formData.departmentName = node.name
      this.showTree = false
    },
    // 点击确定时 - 触发
    async btnOK(){
      try {
        // 校验整个表单
        await this.$refs.addEmployee.validate()
        // 调用新增接口 - 新增员工
        await addEmployee(this.formData)
        // 告诉父组件 -> 更新数据
        this.$parent.getEmployeeListFn()
        // 告诉父组件 -> 关闭弹层
        this.$parent.showDialog = false
      } catch (error) {
        console.log(error)
      }
    },
    // 点击取消时 - 触发
    btnCancel(){
      // 重置原来的数据
      this.formData = {
        username:'',
        mobile:'',
        formOfEmployment:'',
        workNumber:'',
        departmentName:'',
        timeOfEntry:'',
        correctionTime:''
      }
      // 重置校验结果
      this.$refs.addEmployee.resetFields()
      // 关闭弹层
      this.$emit('update:showDialog', false)
    }
  }
};
</script>

<style>
</style>