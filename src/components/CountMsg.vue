<template lang='pug'>
 .prompt
  .title {{messageArr[messageIndex]}}
   .button(@click='goOnMsg()') 就是要看你管我
   .button(@click='leaveMsg()') 不看了

</template>
<script>
export default {
  props: ['number'],
  data() {
    return {
      messageArr: [
        '不好吧,面都還沒見到先不要這樣看糗照拉',
        '欸難道你不知道我是走紳士路線的嗎',
        '夠囉~你再過來我要叫了喔!',
        ''
      ],
      messageIndex: 0
    }
  },
  created() {
    this.$bus.$emit('openMask')
  },
  methods: {
    goOnMsg() {
      this.messageIndex++
      if (this.messageIndex > 2) {
        this.$bus.$emit('getSecondKey')
        this.$bus.$emit('closeMask')
      }
    },
    leaveMsg() {
      this.messageIndex = 0
      this.$bus.$emit('leaveMsg')
      this.$bus.$emit('closeMask')
    }
  }
}
</script>
<style scoped lang='scss'>
.prompt {
  position: fixed;
  top: 40%;
  left: 45%;
  z-index: 5;
  background-color: black;

  .title {
    width: 250px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    .button {
      margin-top: 15px;
      width: 50%;
      height: 20%;
      border-style: solid;
      border-width: 1px;
      border-radius: 20px;
      cursor: pointer;
      a {
        text-decoration: none;
        color: black;
      }
    }
    .button:hover {
      background-color: black;
      text-decoration: none;
      color: white;
    }
  }
}
@media (max-width: 767px) {
  .prompt {
    left: 10%;
    width: 80%;
    .title {
      width: auto;
      height: 150px;
    }
  }
}
</style>
