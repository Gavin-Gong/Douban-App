<template>
  <transition
    mode="out-in"
    enter-active-class="animated slideInUp"
    >
    <div>
      <h3 style="text-align:center; margin-top: 20px">代码实验室</h3>
    <!-- <child></child> -->
    </div>
  </transition>
</template>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
<script>
  import TitleBar from 'components/title-bar';
  import Child from 'pages/lab/child';
  // import store from 'src/vuex/store';
  export default {
    components: {
      TitleBar,
      Child,
    },
    // store,
    created () {
      // console.log(this.$refs.item.$el);
      // this.$emit('get:width');
      // console.log('mounted');
      // console.log(this.$store.state.showCase.showCaseWidth);
      // this.$store.commit('setWidth', 1000);
      // console.log(this.$store.state.showCase.showCaseWidth);
    },
    methods: {
      consoleSth (arg) {
        console.log(arg);
      },
    },
    deactivated () {
      this.$destroy();
    },
  };
</script>
