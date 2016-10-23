<template>
  <div class="expand l-spacing">
    <div class="expand-text">
      <!-- <slot></slot> -->
      <p>{{title}}</p>
      <p :style="tempToggle ? '-webkit-line-clamp: 10000;' : '-webkit-line-clamp: ' + line + ';'">{{text ? text : '暂无' + title}}</p>
    </div>
    <div v-if="text" :class="['toggle-btn', tempToggle ? 'up-arrow' : 'down-arrow']" @click="toggleText"></div>
  </div>
</template>

<script>
  export default {
    props: {
      line: {
        type: [Number, String],
        default: 6
      },
      title: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
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
