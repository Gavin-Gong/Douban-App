<template>
  <i class="material-icons" :style="'font-size:' + size + 'px'">{{name}}</i>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 24
    }
  }
}
</script>
<style lang="scss">
@import '~assets/styles/iconfont.scss';
</style>
