<template>
<div id="movie-list-page"
  v-infinite-scroll="getBookList"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
  <router-link v-for="movie in movieList" :to="{name: 'movie-detail', params: {bookId: movie.id}}">
    <list-item
      :imgurl="movie.images.large">
      <h3 class="title one-line">{{ movie.title }}</h3>
      <rate :star="movie.rating.average">
        &nbsp;&nbsp;{{ movie.rating.average }}
      </rate>
      <p class="one-line">作者: {{ movie.author ? join(movie.author) : '佚名' }}</p>
      <p class="one-line">出版日期: {{ movie.pubdate ? movie.pubdate : '暂无'}}</p>
    </list-item>
  </router-link>
  <p v-show="loading" class="infinite-scroll-icon" style="text-align: center;">
    <mt-spinner type="fading-circle"></mt-spinner>
  </p>
  <p style="text-align: center" v-show="isNoScroll && movieList.length">
    没有更多了！
  </p>
</div>
</template>

<script>
  import ListItem from 'components/list-item';
  import Rate from 'components/rate';
  import { Spinner } from 'mint-ui';
  Vue.component(Spinner.name, Spinner);

  export default {
    components: {
      ListItem,
      Rate,
    },
    data () {
      return {
        movieList: [],
        isNoScroll: false,
        loading: true,
        query: {
          start: 0,
          count: 10,
          lastReq: '',
        },
      };
    },
    methods: {
      getMovieList () {
        if (!this.isNoScroll) {
          this.loading = true;
        }
        let movieListUrl = `movie/search?tag=${this.$route.params.tagId}&start=${this.query.start}&count=${this.query.count}`;
        if (movieListUrl !== this.query.lastReq || !this.query.lastReq) {
          this.$http.get(movieListUrl).then(res => {
            this.loading = false;
            Indicator.close();
            if (res.status === 200) {
              // 避免多次请求导致数据重复
              console.log(res.data);
              this.movieList.push(...res.data.subjects);
              this.query.start += this.query.count;

              // 返回数据小于指定长度则不再触发事件
              if (res.data.subjects.length < this.query.count) {
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
        this.query.lastReq = movieListUrl;
      },
      join (arr) {
        return arr.join(',');
      },
    },
    created () {
      Indicator.open();
      this.getMovieList();
    },
    deactivated () {
      // keep-alive 组件离开时将组件destroy， 防止下次进入相同的页面。
      this.$destroy();
    },
  };
</script>

<style lang="scss">
#movie-list-page {
  .rate-star {
    margin-top: 6px;
    margin-bottom: 6px;
  }
  .infinite-scroll-icon {
    text-align: center;
    .mint-spinner-fading-circle {
      display: inline-block;
    }
  }
}
</style>
