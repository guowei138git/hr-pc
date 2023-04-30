<template>
  <!-- 放置弹层组件 
    在el-dialog中监听其  close事件-->
  <el-dialog title="新增部门" :visible="showDialog"
  @close="btnCancel">
    <!-- 表单数据 label-width：设置标题的宽度-->
    <el-form ref="deptForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>

      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>

      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择"
        @focus="getEmployeeSimplieFn" >
        <!-- 需要循环生成选项 这里做一下简单的处理 显示的是用户名  -->
        <el-option v-for="item in peoples"
        :key="item.id"
        :label="item.username"
        :value="item.username" />
        </el-select>
      </el-form-item>

      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width:80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- 确定和取消 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnOK">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments, getDepartDetail } from "@/api/departments";
import {getEmployeeSimplie} from '@/api/employees'

export default {
  props: {
    // 需要传入一个props遍历来控制 显示或隐藏
    showDialog: {
      type: Boolean,
      default: false
    },
    // 当前操作的节点
    treeNode: {
      type: Object,
      default: null
    },
    
  },
  data() {
    // 部门名称的自定义校验
    const checkNameRepeat = async (rule, value, callback) => {
      console.log("checkNameRepeat", value);
      // value 是部门名称 要去和同级部门下的部门名称比较
      // 有没有相同的  有相同的 -> 不能过  没有相同的 -> 可以过
      // debugger
      const { depts } = await getDepartments();
      // 去找同级部门下 有没有和value相同的数据
      // 首先 先找到同级部门的所有的子部门 pid = id
      // 同级别就是当前操作的节点 treeNode - id
      // 子部门就是 pid
      console.log(this.treeNode);
      const isRepeat = depts
        .filter(item => item.pid === this.treeNode.id)
        .some(item => item.name === value);
      // 如果 isRepeat = true ===> 表示找到了一样的名字
      console.log("isRepeat:", isRepeat);
      isRepeat
        ? callback(new Error(`同级部门下已经存在这个${value}部门了`))
        : callback();
    };
    const checkCodeRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartments();
      // 要求编码 和所有的部门编码都不能重复
      // 由于历史数据原因， 可能没有code 所以加一个条件判断  就是value不为空
      const isRepeat = depts.some(item => item.code === value && value);
      isRepeat
        ? callback(new Error(`组织架构下已经存在这个${value}编码了`))
        : callback();
    };
    return {
      // 定义表单数据
      formData: {
        name: "", // 部门名称
        code: "", // 部门编码
        manager: "", // 部门管理者
        introduce: "" // 部门介绍
      },
      // 定义校验规则
      rules: {
        name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门名称要求1-50个字符",
            trigger: "blur"
          },
          { trigger: "blur", validator: checkNameRepeat }
        ],
        code: [
          { required: true, message: "部门编码不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门编码要求1-50个字符",
            trigger: "blur"
          },
          { trigger: "blur", validator: checkCodeRepeat }
        ],
        manager: [
          { required: true, message: "部门负责人不能为空", trigger: "blur" }
        ],
        introduce: [
          { required: true, message: "部门介绍不能为空", trigger: "blur" },
          { min: 1, max: 300, message: "部门介绍要求1-300个字符" }
        ]
      },
      // 接收获取的员工简单列表的数据
      peoples:[]
    };
  },
  methods: {
    // 获取员工简单列表数据
    async getEmployeeSimplieFn(){
      this.peoples = await getEmployeeSimplie()
    },
    // 获取详情方法
    async getDepartDetail(id){
      // 数据回显到form表单上
      this.formData = await getDepartDetail(id)
      // 这里操作的当前部门的 id  为什么不直接获取 this.treeNode.id 呢？
      // 因为我们是在父组件中来调用这个方法 -> 父组件调用子组件中的方法
      // 而子组件中的 treeNode是通过props传值过来的
      // 关键是 props传值是异步的  所以为了确保稳定采取调用者传值的形式 
    },
    // 点击确定时触发
    btnOK(){
      this.$refs.deptForm.validate(async isOK =>{
        if (isOK){
          // 校验通过 -> 表示可以提交了
          // 调用新增接口 - 添加父部门的id
          await addDepartments({...this.formData, pid:this.treeNode.id})
          // 新增成功之后，调用告诉父组件 - 重新拉取数据
          this.$emit('addDepts')
          // update固定写法
          // ->update:props名称
          this.$emit('update:showDialog', false)
        }
      })
    },
    // 点击取消按钮时触发
    btnCancel(){
      // 取消时 重置数据 和校验
      this.$refs.deptForm.resetFields() // 重置校验字段
      this.$emit('update:showDialog', false) // 关闭弹层
    }
  }
};
</script>

<style>
</style>