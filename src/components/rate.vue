<template>
  <div class="rate-star">
    <span class="star">
      <m-icon v-for="i in hasstar" name="star" size="11"></m-icon>
    </span><span class="no-star" v-if="unstar">
      <m-icon v-for="i in unstar" name="star" size="11"></m-icon>
    </span>
    <slot></slot>
  </div>
</template>
<script>
  import MIcon from 'components/m-icon'
  export default {
    components: {
      MIcon
    },
    props: {
      star: {
        type: [Number, String],
        default: 0
      }
    },
    // create () {
    //   console.log(this.star)
    //   this.star = Math.round(this.star / 2)
    // },
    computed: {
      // TODO 在computed之前改变数据?
      unstar () {
        return Math.round((10 - parseInt(this.star)) / 2)
      },
      hasstar () {
        console.log(this.unstar)
        return 5 - parseInt(this.unstar)
      }
    }
  }
</script>

<style lang="scss">
  .rate-star {
    display: inline-block;
    .star {
      vertical-align: middle;
      i {
        color: #eaea05;
      }
    }
    .no-star {
      vertical-align: middle;
      i {
        color: #dedddd;
      }
    }
  }
</style>
