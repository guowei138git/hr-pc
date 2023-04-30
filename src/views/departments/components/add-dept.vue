<template>
  <!-- 放置弹层组件 -->
  <el-dialog title="新增部门" :visible="showDialog">
    <!-- 表单数据 -->
    <el-form :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>

      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>

      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" />
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
        <el-button size="small">取消</el-button>
        <el-button size="small" type="primary">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from "@/api/departments";
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
    }
  },
  data() {
    // 部门名称的自定义校验
    const checkNameRepeat = async (rule, value, callback) => {
      // value 是部门名称 要去和同级部门下的部门名称比较
      // 有没有相同的  有相同的 -> 不能过  没有相同的 -> 可以过
      const { depts } = await getDepartments();
      // 去找同级部门下 有没有和value相同的数据
      // 首先 先找到同级部门的所有的子部门 pid = id
      // 同级别就是当前操作的节点 treeNode - id
      // 子部门就是 pid
      const isRepeat = depts
        .filter(item => item.pid === this.treeNode.id)
        .some(item => item.name === value);
      // 如果 isRepeat = true ===> 表示找到了一样的名字
      isRepeat
        ? callback(new Error(`同级部门下已经存在这个${value}部门了`))
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
          }
        ],
        manager: [
          { required: true, message: "部门负责人不能为空", trigger: "blur" }
        ],
        introduce: [
          { required: true, message: "部门介绍不能为空", trigger: "blur" },
          { min: 1, max: 300, message: "部门介绍要求1-300个字符" }
        ]
      }
    };
  }
};
</script>

<style>
</style>