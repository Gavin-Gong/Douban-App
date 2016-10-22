<template>
<div id="book-detail">
<!--   <mt-header title="图书详情" fixed>
    <router-link slot="left" to="../">
    <mt-button icon="back"></mt-button>
    </router-link>
  </mt-header> -->
  <intro :title="bookDetail.title" :star="bookDetail.rating.average ? bookDetail.rating.average : 0"
    :hot="bookDetail.rating.numRaters"
    :imgurl="bookDetail.images.large">
    <p>作者: {{ join(bookDetail.author) }}</p>
    <p>出版社: {{ bookDetail.publisher ? bookDetail.publisher : '暂无' }}</p>
    <p>出版时间: {{ bookDetail.pubdate ? bookDetail.pubdate : '暂无'}}</p>
  </intro>
</div>

</template>

<script>
  import { Header, Button } from 'mint-ui'
  import Rate from 'components/rate'
  import Intro from 'components/pages/intro'
  Vue.component(Header.name, Header)
  Vue.component(Button.name, Button)

  export default {
    data () {
      return {
        bookDetail: ''
      }
    },
    components: {
      Rate,
      Intro
    },
    methods: {
      getBookDetail () {
        // Indicator.open()
        this.$http.jsonp(`book/${this.$route.params.id}`).then(res => {
          if (res.status === 200) {
            this.bookDetail = res.data
            console.log(this.bookDetail.rating.average)
          } else {
            // $(this)
          }
        })
      },
      join (arr) {
        return arr.join(', ')
      }
    },
    created () {
      this.getBookDetail()
    }
  }
</script>

<style lang="scss">
#book-detail {
}
</style>
