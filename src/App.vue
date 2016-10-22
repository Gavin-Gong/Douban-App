<template>
  <div id="app">
     <router-view></router-view>
    <nav-bar></nav-bar>
  </div>
</template>
<script>
import NavBar from './nav-bar'
export default {
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
@import '~assets/styles/main.scss';
html {
  height: 100%;
}
body {
  margin: 0;
  background-color: #eee;
}

#app {
  color: #2c3e50;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  padding-bottom: 100px;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

</style>
