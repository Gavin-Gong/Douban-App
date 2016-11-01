<template>
  <div class="" :class="['group-content', extClass]">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    extClass: {
      type: String,
      default: '',
    },
  },
};
</script>
<style>
  .group-content {
    overflow: hidden;
    margin-top: 20px;
    margin-bottom: 20px;
    background: #fff;
  }
</style>
