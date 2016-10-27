<template>
  <i class="material-icons" :style="style">{{name}}</i>
  <!-- <i class="material-icons" :style="'font-size:' + size + 'px'">{{name}}</i> -->
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, String],
      default: 24,
    },
    color: {
      type: String,
      default: '#222',
    },
  },
  data () {
    return {
      style: {
        fontSize: this.size + 'px',
        color: this.color,
      },
    };
  },
};
</script>
<style lang="scss">
@import '~assets/styles/iconfont.scss';
</style>
