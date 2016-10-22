<template>
<tabbar :fixed="true" v-model="selected">
  <tab-item id="book">
    <m-icon slot="icon" name="book"></m-icon>
    读书
  </tab-item>
  <tab-item id="movie" @click="goMovie">
    <m-icon slot="icon" name="movie"></m-icon>
    电影
  </tab-item>
  <tab-item id="music">
    <m-icon slot="icon" name="music_note"></m-icon>
    音乐
  </tab-item>
 <tab-item id="code" >
    <m-icon slot="icon" name="code"></m-icon>
    代码
  </tab-item>
</tabbar>
</template>

<script>
  // import Vue from 'vue'
  import {Tabbar, TabItem} from 'mint-ui'
  import MIcon from 'components/m-icon'
  // Vue.component(Tabbar.name, Tabbar)
  // Vue.component(TabItem.name, TabItem)

  export default {
    components: {
      MIcon,
      Tabbar,
      TabItem
    },
    data () {
      return {
        selected: 'book'
      }
    },
    methods: {
      goMovie () {
        console.log('here')
        this.$route.router.go({name: 'movie'})
      }
    },
    watch: {
      selected (val, oldVal) {
        this.$router.replace({name: this.selected})
      },
      '$route' (val, oldVal) {

      }
    }
  }
</script>
