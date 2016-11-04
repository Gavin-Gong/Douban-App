<template>
  <router-link :to="link" tag='div' class="show-item" ref="showCase">
    <div class="img-box" :style="'background-image: url(' + imgurl + ')'">
      <!-- <img class="show-img" :src="imgurl" alt="图片"> -->
    </div>
    <h3 class="show-title">{{title}}</h3>
    <slot name="content"></slot>
  </router-link>
</template>
<script>
  export default {
    props: {
      imgurl: {
        type: String,
        default: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2291015098,628551162&fm=116&gp=0.jpg',
      },
      title: {
        type: String,
      },
      link: {
        type: Object,
      },
    },
    mounted () {
      if (!this.$store.state.showCase.showCaseWidth) {
        this.$store.commit('setWidth', this.getWidth());
      }
    },
    methods: {
      getWidth () {
        let el = this.$refs.showCase.$el;
        return window.getComputedStyle(el).width.replace('px', '');
      },
    },
  };
</script>
<style lang="scss">
  .show-item {
    overflow: hidden;
    display: inline-block;
    max-width: 100px;
    @media (max-width: 320px) {
        max-width: 90px;
    }
    @media (min-width: 380px) and (max-width: 420px) {
        max-width: 116px;
      }
    box-sizing: border-box;
    .img-box {
      width: 100px;
      height: 140px;
      @media (max-width: 320px) {
        width: 90px;
        height: 130px;
      }
      @media (min-width: 380px) and (max-width: 420px) {
        width: 116px;
        height: 150px;
      }
      // min-width: calc(100vw / 3);
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
