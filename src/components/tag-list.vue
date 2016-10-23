<template>
  <ul class="tag-list l-spacing">
    <li v-for="tag in tags" class="tag">{{ tag.name }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.tag-list {
  list-style: none;
  // padding-left: 10px;
  margin-left: -10px;
  margin-top: -14px;
  >.tag {
    position: relative;
    display: inline-block;
    margin-left: 10px;
    margin-top: 14px;
    padding: 6px 6px;
    text-align: center;
    font-size: 12px;
    line-height: 1;
    // border: 1px solid #333;
    color: #b5b501;

    &:after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      display: block;
      width: 200%;
      height: 200%;
      border-radius: 5px;
      border: 1px solid #aaa;
      transform-origin: center center;
      transform: scale(0.5, 0.5);
    }
  }
}
</style>
