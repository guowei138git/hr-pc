<template>
  <el-card>
      <el-row>
          <el-col>
              <!-- 图标 随着 showBefore显示而显示 -->
              <div v-if="showBefore" class="before">
                  <!-- 放置icon图标 -->
                  <i class="el-icon-info" />
                  <!-- 前插槽 -->
                  <slot name="before" />
                  <!-- 有名字的叫具名插槽 没名字的叫匿名插槽 -->
              </div>
          </el-col>
          <el-col>
              <!-- 后插槽 -->
              <slot name="after" />
              <!-- 有名字的叫具名插槽 没名字的叫匿名插槽 -->
          </el-col>
      </el-row>
  </el-card>
</template>

<script>
// 组件可以显示 左侧内容 也可以显示右侧内容
// 如果左侧内容不传 -> 不显示
export default {
    props: {
        showBefore:{
            default:false,
            type:Boolean
        }
    }
}
</script>

<style>

</style>