<template lang='pug'>
 .body
  p {{`現在共有${number}次提醒拉~~我把所有的彩蛋放在網頁裡了,去找吧!`}}
</template>
<script>
export default {
  props: ['number']
}
</script>
<style scoped lang='scss'>
.body {
  width: 100%;
  height: 100px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
  }
}
</style>
