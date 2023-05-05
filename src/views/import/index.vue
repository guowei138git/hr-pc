<template>
  <div>
    123
    <!-- 公共导入组件  onSuccess-->
    <upload-excel :onSuccess="successFn" />
  </div>
</template>

<script>
import { importEmployee } from '../../api/employees'

export default {
  methods: {
     async successFn( {header, results} ){
      // debugger
      // header中的数据 - 是中文  result中的数据也是中文
      const userRelatons = {
        '入职日期':'timeOfEntry',
        '手机号':'mobile',
        '姓名':'username',
        '转正日期':'correctionTime',
        '工号':'workNumber'
      }
      const arr = []
      results.forEach(item => {
        const userInfo = {}
        console.log(item)
        Object.keys(item).forEach(key => {
          console.log('key:', key)
          userInfo[userRelatons[key]] = item[key]
          console.log('userInfo-key:', userRelatons[key])
          console.log('userInfo-value:', item[key])
        })
        console.log(userInfo)
        arr.push(userInfo)
      })
      console.log('arr:', arr)
      // 调用导入接口
      await importEmployee(arr)
      this.$router.back()
    }
  }

};
</script>

<style>
</style>