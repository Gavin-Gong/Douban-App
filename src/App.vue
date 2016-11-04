<template>
  <div id="app">
    <keep-alive>
     <router-view></router-view>
     </keep-alive>
    <nav-bar></nav-bar>
  </div>
</template>
<script>
import NavBar from './nav-bar';
import store from 'src/store';
export default {
  components: {
    NavBar,
  },
  store,
};
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
  text-decoration: none;
  color: #000;
}

</style>
