<template>
  <div class="list-item l-spacing onepx-b">
    <!-- <img src="~assets/images/logo.png" alt="" class="thumbnail"> -->
    <div class="thumbnail" :style="{backgroundImage: `url(${imgurl})`, width: '80px', height: '100px'}"></div>
    <div class="item-center" >
      <slot></slot>
    </div>
    <div class="right" v-if="$slots['right']">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
// TODO 图片引用
// TODO 根据是否slot, 决定是否渲染右边元素(v-if)
  export default {
    props: {
      imgurl: {
        type: String,
        required: true,
      },
      width: {
        type: [String, Number],
        default: 80,
      },
      height: {
        type: [String, Number],
        default: 100,
        validator (val) {
          // console.log(typeof val);
          return val;
        },
      },
    },
    created () {
      // console.log(this.$slots['right']);
    },
    mounted () {
      // console.log(this.$slots['right']);
    },
    data () {
      return {
        // imgurl: require('assets/images/logo.png'),
      };
    },
  };
</script>
<style lang="scss">
  .list-item {
    display: flex;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #fff;
    .thumbnail {
      background-repeat: no-repeat;
      background-size: cover;
      flex: 0 0 80px;
    }
    .item-center {
      margin-left: 10px;
      * {
        max-width: calc(100vw - 110px);
      }
    }
  }
</style>

