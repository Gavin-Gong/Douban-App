<template>
  <div class="intro">
    <div class="banner-box">
      <div class="banner-bg" :style="'background-image: url(' + imgurl + ')'">
      </div>
      <img :src="imgurl" alt="图片">
    </div>
    <div :class="['info', 'l-spacing', sty]">
      <div class="left-info">
        <h2>{{ title }}</h2>
        <slot></slot>
      </div>
      <div class="right-info">
        <h2>{{ star }}</h2>
        <rate :star="star"></rate>
        <p>{{ hot }} 人</p>
      </div>
    </div>
  </div>
</template>
  <script>
    import MIcon from 'components/m-icon';
    import Rate from 'components/rate';
    export default {
      components: {
        MIcon,
        Rate,
      },
      props: {
        title: {
          type: String,
        },
        star: {
          type: [Number, String],
        },
        hot: {
          type: [String, Number],
        },
        sty: {
          type: String,
          default: '',
        },
        imgurl: {
          type: String,
        },
      },
    };
  </script>
  <style lang="scss" scoped>
  .intro {
    .banner-box {
      position: relative;
      text-align: center;
      .banner-bg {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 250px;
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
    .info {
      padding-top: 20px;
      padding-bottom: 20px;
      display: flex;
      justify-content: space-between;
      .left-info {
      }
      .right-info {
        flex: 0 0 100px;
        text-align: center;
        padding-top: 10px;
        height: 100px;
        box-shadow: 0px 1px 10px #afafaf;
      }
    }
  }
  </style>
