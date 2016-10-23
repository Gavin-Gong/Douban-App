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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  >.tag {
    padding: 4px 6px;
    text-align: center;
    font-size: 12px;
    border-radius: 5px;
    border: 1px solid #333;
  }
}
</style>
