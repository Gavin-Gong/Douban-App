<template>
  <ul class="tag-list">
    <router-link v-for="tag in tags" :to="tag.link">
      <li class="tag" style="">{{ tag.tag }}</li>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
};
// TODO book-detail data 处理
</script>

<style lang="scss">
.tag-list {
  list-style: none;
  padding-left: 0;
  margin-left: -10px;
  margin-top: 0;
  margin-bottom: 10px;
  .tag {
    position: relative;
    display: inline-block;
    margin-left: 10px;
    padding: 6px 6px;
    text-align: center;
    font-size: 12px;
    line-height: 1;
    color: #b5b501;
    margin-top: 10px;

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
