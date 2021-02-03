<template lang='pug'>
 .prompt
  .title 網頁將展示
   p Infinite Scroll
   p Parallax Scrolling(需解鎖)
   p tip:第一頁就有一把鑰匙喔^^
   .button.d-flex.justify-center.align-center.noselect.pointer(@click='coloseMask()') 我知道了

</template>
<script>
export default {
  methods: {
    coloseMask() {
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
