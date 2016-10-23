<template>
  <div class="expand l-spacing">
    <div class="expand-text">
      <!-- <slot></slot> -->
      <p>{{title}}</p>
      <p v-if="type === 'text'" :style="tempToggle ? '-webkit-line-clamp: 10000;' : '-webkit-line-clamp: ' + line + ';'">{{content ? content : '暂无' + title}}</p>
      <p v-if="type === 'html'" :style="tempToggle ? '-webkit-line-clamp: 10000;' : '-webkit-line-clamp: ' + line + ';'" v-html="content ? content : '暂无' + title"></p>
    </div>
    <div v-if="content" :class="['toggle-btn', tempToggle ? 'up-arrow' : 'down-arrow']" @click="toggleText"></div>
  </div>
</template>

<script>
  export default {
    props: {
      line: {
        type: [Number, String],
        default: 4
      },
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'text'
      },
      toggle: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        tempToggle: this.toggle
      }
    },
    methods: {
      toggleText () {
        if (this.tempToggle) {
          this.tempToggle = false
        } else {
          this.tempToggle = true
        }
      }
    }
  }
</script>

<style lang="scss">
  .expand {
    margin-bottom:  10px;
    .expand-text {
      >p {
        &:first-child {
          color: #555;
          margin-bottom: 6px;
        }
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        }
      }
    .toggle-btn {
      position: relative;
      height: 30px;
      margin-top: 10px;
      &:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;
      }
    }
    .up-arrow {
      &:after {
        border-bottom-color: #555;
        margin-top: -8px
      }
    }
    .down-arrow {
      &:after {
        border-top-color: #555;
      }
    }
  }
</style>
