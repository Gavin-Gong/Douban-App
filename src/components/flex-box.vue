<template>
  <div class="flex-box l-spacing">
    <slot></slot>
  </div>
</template>
<script>
  export default {

  };
</script>
<style>
  .flex-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
  }
</style>
