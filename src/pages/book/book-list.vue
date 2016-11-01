<template>
<div id="book-list-page"
  v-infinite-scroll="getBookList"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
  <router-link v-for="book in bookList" :to="{name: 'book-detail', params: {bookId: book.id}}">
    <list-item
      :imgurl="book.images.large">
      <h3 class="title one-line">{{ book.title }}</h3>
      <rate :star="book.rating.average">
        &nbsp;&nbsp;{{ book.rating.average }}
      </rate>
      <p class="one-line">作者: {{ book.author ? join(book.author) : '佚名' }}</p>
      <p class="one-line">出版日期: {{ book.pubdate ? book.pubdate : '暂无'}}</p>
    </list-item>
  </router-link>
  <p v-show="loading" class="infinite-scroll-icon" style="text-align: center;">
    <mt-spinner type="fading-circle"></mt-spinner>
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
        bookList: [],
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
      // getBookList () {
      //   // Indicator.open();
      //   this.$http.get(`book/search?tag=${this.$route.params.tagId}&start=${this.query.start}&count=${this.query.count}`).then(res => {
      //     // Indicator.close();
      //     if (res.status === 200) {
      //       this.bookList.push(...res.data.books);
      //       console.log(this.bookList);
      //       this.query.start += this.query.count;
      //     } else {
      //       console.log('err');
      //     }
      //   });
      // },
      getBookList () {
        if (!this.isNoScroll) {
          this.loading = true;
        }
        let bookListUrl = `book/search?tag=${this.$route.params.tagId}&start=${this.query.start}&count=${this.query.count}`;
        if (bookListUrl !== this.query.lastReq || !this.query.lastReq) {
          this.$http.get(bookListUrl).then(res => {
            this.loading = false;
            Indicator.close();
            if (res.status === 200) {
              // 避免多次请求导致数据重复
              console.log(res.data);
              this.bookList.push(...res.data.books);
              this.query.start += this.query.count;

              // 返回数据小于指定长度则不再触发事件
              if (res.data.books.length < this.query.count) {
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
        this.query.lastReq = bookListUrl;
      },
      join (arr) {
        return arr.join(',');
      },
    },
    created () {
      Indicator.open();
      this.getBookList();
    },
  };
</script>

<style lang="scss">
#book-list-page {
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
