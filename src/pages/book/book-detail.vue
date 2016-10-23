<template>
<div id="book-detail">
  <intro :title="bookDetail.title" :star="bookDetail.rating.average"
    :hot="bookDetail.rating.numRaters"
    :imgurl="bookDetail.images.large">
    <p>作者: {{ join(bookDetail.author) ? join(bookDetail.author) : '佚名'}}</p>
    <p>出版社: {{ bookDetail.publisher ? bookDetail.publisher : '暂无' }}</p>
    <p>出版时间: {{ bookDetail.pubdate ? bookDetail.pubdate : '暂无'}}</p>
  </intro>
  <tag-list :tags="bookDetail.tags"></tag-list>
  <expand title="内容简介" :content="bookDetail.summary">
  </expand>
  <expand title="作者简介" :content="bookDetail.author_intro">
  </expand>
  <expand title="目录" :content="bookDetail.catalog.replace(/\n/g, '</br>')" type="html">
  </expand>
  <div class="comment-list"
        v-infinite-scroll="getAnnotations"
        infinite-scroll-disabled="isNoScroll">
    <router-link to="{name: 'annotation', params: {id: item.id}}" v-for="item in commentList">
      <comment
        :imgurl="item.author_user.large_avatar"
        :name="item.author_user.name"
        :text="item.summary"
        :hot="item.comments_count">
      </comment>
    </router-link>
  </div>
</div>

</template>

<script>
  import Rate from 'components/rate'
  import Intro from 'components/pages/intro'
  import Expand from 'components/expand'
  import TagList from 'components/tag-list'
  import Comment from 'components/pages/comment'

  export default {
    data () {
      return {
        bookDetail: '',
        commentList: [],
        isNoScroll: false,
        query: {
          start: 0,
          count: 10
        }
      }
    },
    components: {
      Rate,
      Intro,
      Expand,
      TagList,
      Comment
    },
    methods: {
      getBookDetail () {
        Indicator.open()
        this.$http.jsonp(`book/${this.$route.params.id}`).then(res => {
          Indicator.close()
          if (res.status === 200) {
            this.bookDetail = res.data
            console.log(this.bookDetail.rating.average)
          } else {
            // $(this)
          }
        })
      },
      getAnnotations () {
        this.$http.jsonp(`book/${this.$route.params.id}/annotations?start=${this.query.start}&count=${this.query.count}`).then(res => {
          console.log(`book/${this.$route.params.id}/annotations?start=${this.query.start}&count=${this.query.count}`)
          if (res.status === 200) {
            if (res.data.annotations.length < this.query.count) {
              this.isNoScroll = true
            } else {
              this.query.start += 10
            }
            this.commentList.push(...res.data.annotations)
            console.log(this.commentList)
            // this.commentList = res.data.annotations
          } else {
            console.err('get comment fail')
          }
        })
      },
      loadMore () {
        console.log('loadMore')
      },
      join (arr) {
        return arr.join(', ')
      }

    },
    created () {
      this.getBookDetail()
      this.getAnnotations()
    }
  }
</script>

<style lang="scss">
#book-detail {
  padding-bottom: 40px;
}
</style>
