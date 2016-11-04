
<template>
  <div id="movie-page">
    <search v-model="searchText">
      <router-link :to="{name: 'movie-detail', params: {movieId: item.id}}" v-for="item in searchResult">
        <cell :title="item.title"></cell>
      </router-link>
    </search>
    <!-- 热映 -->
      <group v-show="hotMovies">
        <title-bar title="影院热映"></title-bar>
        <!-- <title-bar title="影院热映" :link="{name: 'movie-list', params: {book: 'JavaScript'}}"></title-bar> -->
        <div class="show-area">
          <div class="show-item-wrapper" :style="{width: showAreaWidth}">
            <show-case
              v-for="item in hotMovies"
              :imgurl="item.images.large"
              :link="{name: 'movie-detail', params: {movieId: item.id}}"
              :title="item.title" ref="item">
              <!-- <span slot="content" class="rating-text">评分: {{item.rating.average}}</span> -->
              <rate :star="item.rating.average" slot="content">
                <span class="rating-text">{{ item.rating.average }}</span>
              </rate>
            </show-case>
          </div>
        </div>
      </group>
    <!-- 即将上线 -->
    <group ext-class="coming-movies">
     <title-bar title="即将上映"></title-bar>
      <flex-box>
        <flex-item v-for="item in comingMovies">
            <show-case
              :imgurl="item.images.large"
              :link="{name: 'movie-detail', params: {movieId: item.id}}"
              :title="item.title">
              <!-- <span slot="content" class="rating-text">评分: {{item.rating.average}}</span> -->
              <rate :star="item.rating.average" slot="content">
                <span class="rating-text">{{ item.rating.average }}</span>
              </rate>
            </show-case>
        </flex-item>
      </flex-box>
    </group>

    <!-- 口碑榜 -->
    <group></group>

    <!-- tag选电影 -->

  </div>
</template>

<script>
  import { Search, Cell } from 'mint-ui';
  import TitleBar from 'components/title-bar';
  import Group from 'components/group';
  import ShowCase from 'components/show-case';
  import MIcon from 'components/m-icon';
  import Rate from 'components/rate';
  import TagList from 'components/tag-list';
  import FlexBox from 'components/flex-box';
  import FlexItem from 'components/flex-item';
  export default {
    components: {
      Search,
      Cell,
      TitleBar,
      ShowCase,
      Group,
      Rate,
      MIcon,
      TagList,
      FlexBox,
      FlexItem,
    },
    data () {
      return {
        searchResult: '',
        searchText: '',
        hotMovies: '',
        comingMovies: '',
        cityName: '杭州',
      };
    },
    methods: {
      getSearchData () {
        this.$http.get(`movie/search?q=${this.searchText}`).then(res => {
          console.log(res.data);
          this.searchResult = res.data.subjects;
        }).catch(err => {
          console.info(err);
        });
      },
      getMovies (tag, storeKey) {
        return this.$http.get(`movie/${tag}?count=9`).then(res => {
          console.log(res.data);
          this.$set(this, storeKey, res.data.subjects);
          console.log(this.comingMovies);
          console.log(res.data.subjects);
        });
      },
      gethotMovies () {
        this.$http.get(`movie/in_theaters?city=${this.cityName}&count=10`).then(res => {
          this.hotMovies = res.data.subjects;
          // this.setWidth();
        });
      },
      getCityName () {
        // html5获取经纬度 -> 百度api -> cityName
        // 获取失败 -> 换api获取地址
      },
    },
    watch: {
      searchText (val, oldVal) {
        if (this.searchText.trim()) {
          this.getSearchData();
        }
      },
    },
    computed: {
      showAreaWidth () {
        return this.$store.state.showCase.showCaseWidth * 10 + 100 + 'px';
      },
      // console.log(this.$refs);
      // console.log(this.$refs[0]);
      // console.log(Object.keys(this.$refs));
      // // let el = this.$refs.showCase[0].$el;
      // showAreaWidth () {
      //   this.$nextTick(() => {
      //     let el = document.querySelector('.show-item');
      //     console.log(el);
      //     return window.getComputedStyle(el).width.replace('px', '') * 10;
      //   });
      // },
    },
    mounted () {
      // console.log('this.$refs', this.$refs);
      // console.log('this.$refs.item', this.$refs.item);
      this.$emit('width');
      // let el = document.querySelector('.show-item');
      // console.log('el', el);
      // this.showAreaWidth = window.getComputedStyle(el).width.replace('px', '') * 10;
    },
    // 使用了keep-alive， 所以先判断是否get数据了，有数据的话就不要重新请求了 毕竟beforeRouteEnter的执行时机先于created.
    beforeRouteEnter (to, from, next) {
      console.log('router enter', Date.now());
      next(vm => {
        if (!vm.hotMovies && !vm.comingMovies) {
          Indicator.open();
          let p1 = vm.gethotMovies();
          let p2 = vm.getMovies('coming_soon', 'comingMovies');
          Promise.all([p1, p2]).then(() => {
            Indicator.close();
          });
        }
      });
    },
  };
</script>

<style lang="scss">
#movie-page {
  .mint-cell-wrapper .mint-cell-title{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .mint-search {
    height: auto;
    .mint-search-list {
      z-index: 10000;
      padding-top: 0;
      top: 44px;
    }
  }
  .show-area {
    width: 100%;
    overflow-y: scroll;
    .show-item-wrapper {
      .show-item {
        margin-left: 10px;
        .rating-text {
          margin-left: 4px;
          position: relative;
          top: -2px;
          font-size: 12px;
          color: #282828;
          vertical-align: middle;
        }
      }
    }
  }
  .coming-movies {
    padding-bottom: 15px;
    .flex-box {
      margin-bottom: -15px;
      .flex-item {
        margin-bottom: 15px;
      }
    }
    .show-item {
      margin-left: 0!important;
    }
  }
}
</style>
