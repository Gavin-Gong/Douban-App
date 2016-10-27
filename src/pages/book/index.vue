
<template>
  <div id="book-page">
    <search v-model="searchText">
      <router-link :to="{name: 'book-detail', params: {bookId: item.id}}" v-for="item in searchResult.books">
        <cell :title="item.title"></cell>
      </router-link>
    </search>

    <!-- JS -->
    <group v-show="jsBooks">
      <title-bar title="JavaScript" :link="{name: 'book-list', params: {tagId: 'JavaScript'}}"></title-bar>
      <div class="show-area">
        <div class="show-item-wrapper" :style="'width:' +   1110 + 'px;'">
          <show-case
            v-for="item in jsBooks"
            :imgurl="item.images.large"
            :link="{name: 'book-detail', params: {bookId: item.id}}"
            :title="item.title">
            <!-- <span slot="content" class="rating-text">评分: {{item.rating.average}}</span> -->
            <rate :star="item.rating.average" slot="content">
              <span class="rating-text">{{ item.rating.average }}</span>
            </rate>
          </show-case>
        </div>
      </div>
    </group>

    <!-- psy -->
    <group v-show="psyBooks">
      <title-bar title="心理学" :link="{name: 'book-list', params: {tagId: '心理学'}}"></title-bar>
      <div class="show-area">
        <div class="show-item-wrapper" :style="'width:' +   1110 + 'px;'">
          <show-case
            v-for="item in psyBooks"
            :imgurl="item.images.large"
            :link="{name: 'book-detail', params: {bookId: item.id}}"
            :title="item.title">
            <!-- <span slot="content" class="rating-text">评分: {{item.rating.average}}</span> -->
            <rate :star="item.rating.average" slot="content">
              <span class="rating-text">{{ item.rating.average }}</span>
            </rate>
          </show-case>
        </div>
      </div>
    </group>

    <!-- random book -->
    <group ext-class="random-book">
      <show-case
        v-if="randomBook"
        :imgurl="randomBook.image"
        :link="{name: 'book-detail', params: {bookId: randomBook.id}}"
        :title="randomBook.title"></show-case>
      <div class="no-content" v-if="!randomBook">并不是每次随机都能获取到到书</div>
      <br>
      <div class="random-btn" @click="getRandomBook">
        <m-icon name="cached"></m-icon>
        <p>随机看书</p>
      </div>
    </group>
    <!-- get book  by select tag -->
  </div>
</template>

<script>
  /* eslint-disable*/
  import { Search, Cell } from 'mint-ui';
  import TitleBar from 'components/title-bar';
  import Group from 'components/group';
  import ShowCase from 'components/show-case';
  import MIcon from 'components/m-icon';
  import Rate from 'components/rate';

  export default {
    components: {
      Search,
      Cell,
      TitleBar,
      ShowCase,
      Group,
      Rate,
      MIcon,
    },
    data () {
      return {
        searchText: '',
        searchResult: '',
        jsBooks: '',
        psyBooks: '',
        randomBook: '',
      };
    },
    methods: {
      getSearchData () {
        this.$http.get(`book/search?q=${this.searchText}`).then(res => {
          console.log(res);
          this.searchResult = res.data;
        }).catch(err => {
          console.info(err);
        });
      },
      getBooks (tag, storeKey) {
        // TDDO promise嵌套
        return this.$http.get(`book/search?tag=${tag}&count=10`).then(res => {
          console.log(res.data);
          this.$set(this, storeKey, res.data.books);
        });
      },
      getRandomBook () {
        let randomId = Math.floor(Math.random() * (99999999 - 1111111 + 1)) + 1111111;
        this.$http.get(`book/${randomId}`).then(res => {
          console.log(res);
          this.randomBook = res.data;
          console.log(this.randomBook);
        }).catch(() => {
          console.log('err');
        });
      },
    },
    watch: {
      searchText (val, oldVal) {
        if (this.searchText.trim()) {
          this.getSearchData();
        }
      },
    },
    created () {
      Indicator.open()
      let p1 = this.getBooks('JavaScript', 'jsBooks');
      let p2 = this.getBooks('心理学', 'psyBooks');
      Promise.all([p1, p2]).then(() => {
        Indicator.close()
      });
      // this.getBooks('JavaScript', 'jsBooks');
      // this.getBooks('心理学', 'psyBooks');
    },
  };
</script>

<style lang="scss">
#book-page {
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
  .random-book {
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
    .random-btn {
      display: inline-block;
      p {
        font-size: 12px;
      }
    }
  }
}
</style>
