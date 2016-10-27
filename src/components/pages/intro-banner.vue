<template>
  <div class="banner-box">
    <div class="banner-bg" :style="'background-image: url(' + imgurl + ')'">
    </div>
    <img :src="imgurl" alt="图片">
    <div class="banner-info">
      {{ title }}
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
    imgurl: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.banner-box {
    .banner-box {
      position: relative;
      .banner-bg {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 250px;
        // background-image: url(~assets/images/logo.png);
        background-repeat: no-repeat;
        background-size: cover;
        filter: blur(35px);
      }
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        max-height: 200px;
        transform: translate(-50%, -50%);
        z-index: 100;
      }
    }
}
</style>
