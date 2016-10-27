<template>
  <div class="rate-star">
      <m-icon v-for="i in hasstar" name="star" size="11" color="#eaea05"></m-icon>
      <m-icon v-for="i in unstar" name="star" size="11" color="#dedddd"></m-icon>
    <slot></slot>
  </div>
</template>
<script>
  import MIcon from 'components/m-icon';
  export default {
    components: {
      MIcon,
    },
    props: {
      star: {
        type: [Number, String],
        default: 0,
      },
    },
    // create () {
    //   console.log(this.star)
    //   this.star = Math.round(this.star / 2)
    // },
    computed: {
      // TODO 在computed之前改变数据?
      unstar () {
        return Math.round((10 - parseInt(this.star)) / 2);
      },
      hasstar () {
        return 5 - parseInt(this.unstar);
      },
    },
  };
</script>

<style lang="scss">
  .rate-star {
    display: inline-block;
  }
</style>
