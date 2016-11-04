<template>
  <h1>from child</h1>
</template>

<script>
  export default {
    methods: {

    },
    mounted () {
      // this.$on('get:width', () => {
      //   return "i'm width";
      // });
      console.log('mounted');
      this.$emit('getwidth', 'width');
      console.log('emited');
    },
  };
</script>
