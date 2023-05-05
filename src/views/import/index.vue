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
          if (userRelatons[key] === 'timeOfEntry' || userRelatons[key] === 'correctionTime') {
            // 后端接口 限制了  不能是字符串 要求 - 时间类型
            userInfo[userRelatons[key]] = new Date(this.formatDate(item[key]), '/')
          } else {
             userInfo[userRelatons[key]] = item[key]
          }
          console.log('userInfo-key:', userRelatons[key])
          console.log('userInfo-value:', item[key])
        })
        console.log(userInfo)
        arr.push(userInfo)
      })
      console.log('arr:', arr)
      // 调用导入接口
      await importEmployee(arr)
      this.$message.success('导入excel成功')
      // 返回上一页
      this.$router.back()
    },
    // 转化excel的日期格式
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }

};
</script>

<style>
</style>