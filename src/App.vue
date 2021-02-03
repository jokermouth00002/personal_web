<template lang='pug'>
  #app
    .mask(v-if='openMask')
    router-view
</template>
<script>
export default {
  data() {
    return {
      openMask: true
    }
  },
  created() {
    window.app = this
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    document.documentElement.style.overflow = 'hidden'
    this.$bus.$on('closeMask', () => {
      document.documentElement.style.overflow = 'auto'
      this.openMask = false
    })
    this.$bus.$on('openMask', () => {
      this.openMask = true
      document.documentElement.style.overflow = 'hidden'
    })
  },
  methods: {}
}
</script>>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.mask {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #505050;
  z-index: 4;
  opacity: 0.7;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
