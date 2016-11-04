<template>
  <div class="title-bar l-spacing">
    <div class="title-bar-left">
      <div class="main-titlt">{{title}}</div>
      <!-- <div class="sub-titlt">{{}}</div> -->
      <slot name="sub-titlt"></slot>
    </div>
    <router-link :to="link" v-if="link">
      <div class="title-bar-right">
        <span class="link-text">{{text}}</span>
        <m-icon v-if="icon" :name= "icon" :size="size" class="link-icon"></m-icon>
        <slot name="icon"></slot>
      </div>
    </router-link>
  </div>
</template>

<script>
  import MIcon from 'components/m-icon';
  export default {
    components: {
      MIcon,
    },
    props: {
      title: {
        type: String,
      },
      text: {
        type: String,
        default: '更多',
      },
      icon: {
        type: [String, Boolean],
        default: 'keyboard_arrow_right',
      },
      size: {
        type: [Number, String],
      },
      link: {
        type: [Object, String],
        default: '',
      },
    },
  };
</script>

<style lang="scss">
    .title-bar {
      display: flex;
      justify-content: space-between;
      padding-top: 10px;
      padding-bottom: 10px;
       .title-bar-left {
        font-size: 16px;
       }
       .title-bar-right {
        .link-text {
          vertical-align: middle;
          margin-right: -10px;
        }
        .link-icon {
          vertical-align: middle;
          margin-right: -5px;
        }
      }
  }
</style>
