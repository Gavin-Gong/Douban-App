<template>
  <router-link :to="link">
  <div class="show-item">
    <div class="img-box" :style="'background-image: url(' + imgurl + ')'">
      <!-- <img class="show-img" :src="imgurl" alt="图片"> -->
    </div>
    <h3 class="show-title">{{title}}</h3>
    <slot name="content"></slot>
  </div>
  </router-link>
</template>
<script>
  export default {
    props: {
      imgurl: {
        type: String,
        default: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2291015098,628551162&fm=116&gp=0.jpg'
      },
      title: {
        type: String
      },
      link: {
        type: Object
      }
    }
  }
</script>
<style lang="scss">
  .show-item {
    overflow: hidden;
    display: inline-block;
    margin-left: 10px;
    max-width: 100px;
    box-sizing: border-box;
    .img-box {
      width: 100px;
      height: 140px;
      background-repeat: no-repeat;
      background-size: cover;
      border: 1px solid #d4cecd;
    }
    .show-title {
      margin-top: 10px;
      margin-bottom: 0;
      font-weight: normal;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
