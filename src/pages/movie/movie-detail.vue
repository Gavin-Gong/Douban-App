<template>
<div id="movie-detail" v-if="movieDetail">
  <intro :title="movieDetail.title" :star="movieDetail.rating.average"
    :hot="movieDetail.rating.numRaters"
    :imgurl="movieDetail.image">
    <p>类型: {{ movieDetail.attrs.movie_type ? join(movieDetail.attrs.movie_type) : '暂无' }}</p>
    <p>导演: {{ movieDetail.attrs.director ? join(movieDetail.attrs.director): '暂无' }}</p>
    <p>演员: {{ movieDetail.attrs.cast ? join(movieDetail.attrs.cast): '暂无' }}</p>
    <p>语言: {{ movieDetail.attrs.language ? join(movieDetail.attrs.language): '暂无' }}</p>
    <p>地区: {{ movieDetail.attrs.country ? join(movieDetail.attrs.country): '暂无' }}</p>
    <p>上映年份: {{ movieDetail.attrs.year ? join(movieDetail.attrs.year) : '暂无'}}</p>
  </intro>
  <expand title="内容简介" :content="movieDetail.summary" :toggle="true">
  </expand>
</div>

</template>

<script>
  import Rate from 'components/rate';
  import Intro from 'components/pages/intro';
  import Expand from 'components/expand';

  export default {
    data () {
      return {
        movieDetail: '',
      };
    },
    components: {
      Rate,
      Intro,
      Expand,
    },
    methods: {
      getMovieDetail () {
        Indicator.open();
        this.$http.get(`movie/${this.$route.params.movieId}`).then(res => {
          Indicator.close();
          if (res.status === 200) {
            this.movieDetail = res.data;
            console.log(this.movieDetail.rating.average);
          } else {
          }
        });
      },
      join (arr) {
        return arr.join(', ');
      },
    },
    activated () {
      console.log('activated');
    },
    deactivated () {
      // keep-alive 组件离开时将组件destroy， 防止下次进入相同的页面。
      this.$destroy();
    },
    created () {
      this.getMovieDetail();
    },
  };
</script>
<style lang="scss">
#movie-detail {
  // padding-top: 20px;
  // padding-bottom: 40px;
  background-color: #eee;
  .banner-box {
    img {
      height: 80%;
    }
  }
  .toggle-btn {
    display: none;
  }
}
</style>
