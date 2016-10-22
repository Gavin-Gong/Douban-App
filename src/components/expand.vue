<template>
  <div class="expand">
    <div class="expand-text">
      <slot></slot>
      <p>{{}}</p>
    </div>
    <div class="toggle-btn"></div>
  </div>
</template>

<script>
  export default {
    props: {
      line: {
        type: [Number, String]
      },
      text: {
        type: String,
        required: true
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  .expand {
    .expand-text {

      },
      .toggle-btn {
        // height: 30px;
        &:after {
          display: inline-block;
        }
      }
  }
</style>
