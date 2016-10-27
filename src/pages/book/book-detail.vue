<template>
<div id="book-detail" v-if="bookDetail">
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
  <expand title="目录" :content="bookDetail.catalog.replace(/\n/g, '<br>')" type="html">
  </expand>
  <div class="comment-list"
        v-infinite-scroll="getAnnotations"
        infinite-scroll-disabled="isNoScroll"
        infinite-scroll-distance="10">
    <h3 class="l-spacing comment-title" v-if="commentList.length">读书笔记</h3>
    <router-link v-for="item in commentList" :to="{name: 'annotation', params: {annotationId: item.id, bookId: $route.params.bookId}}">
      <comment
        :imgurl="item.author_user.large_avatar"
        :name="item.author_user.name"
        :text="item.summary"
        :hot="item.comments_count">
      </comment>
    </router-link>
    <p v-show="loading" class="infinite-scroll-icon">
      <mt-spinner type="fading-circle"></mt-spinner>
    </p>
    <p class="infinite-scroll-icon" v-show="isNoScroll">
      没有更多了！
    </p>
  </div>
</div>

</template>

<script>
  import Rate from 'components/rate';
  import Intro from 'components/pages/intro';
  import Expand from 'components/expand';
  import TagList from 'components/tag-list';
  import Comment from 'components/pages/comment';
  import { Spinner } from 'mint-ui';
  Vue.component(Spinner.name, Spinner);

  export default {
    data () {
      return {
        bookDetail: '',
        commentList: [],
        isNoScroll: false,
        loading: true,
        query: {
          start: 0,
          count: 10,
          lastReq: '',
        },
      };
    },
    components: {
      Rate,
      Intro,
      Expand,
      TagList,
      Comment,
    },
    methods: {
      getBookDetail () {
        Indicator.open();
        this.$http.get(`book/${this.$route.params.bookId}`).then(res => {
          Indicator.close();
          if (res.status === 200) {
            this.bookDetail = res.data;
            console.log(this.bookDetail.rating.average);
          } else {
            // $(this)
          }
        });
      },
      getAnnotations () {
        if (!this.isNoScroll) {
          this.loading = true;
        }
        let annotationUrl = `book/${this.$route.params.bookId}/annotations?start=${this.query.start}&count=${this.query.count}`;
        if (annotationUrl !== this.query.lastReq || !this.query.lastReq) {
          this.$http.get(annotationUrl).then(res => {
            this.loading = false;
            if (res.status === 200) {
              // 避免多次请求导致数据重复
              console.log(res.data);
              this.commentList.push(...res.data.annotations);
              this.query.start += this.query.count;

              // 返回数据小于指定长度则不再触发事件
              if (res.data.annotations.length < this.query.count) {
                this.isNoScroll = true;
                console.log('不再获取数据');
              } else {
                console.log('准备下一条数据获取');
              }
            } else {
              console.err('get comment fail');
            }
          });
        } else {
          console.log('no repeat request');
          this.loading = false;
        }
        this.query.lastReq = annotationUrl;
      },
      loadMore () {
        console.log('loadMore');
      },
      join (arr) {
        return arr.join(', ');
      },
    },
    created () {
      this.getBookDetail();
      this.getAnnotations();
    },
  };
</script>

<style lang="scss">
#book-detail {
  // padding-top: 20px;
  // padding-bottom: 40px;
  background-color: #eee;
  .comment-title {
    margin-bottom: 15px;
    padding-left: 15px;
  }
  .infinite-scroll-icon {
    text-align: center;
    .mint-spinner-fading-circle {
      display: inline-block;
    }
  }
}
</style>
