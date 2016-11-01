/* eslint-disable */
const Book = resolve => (require(['./pages/book/index.vue'], resolve));
const BookDetail = resolve => (require(['./pages/book/book-detail'], resolve));
// const BookList = resolve => (require(['./pages/book/book-list'], resolve));
import BookList from './pages/book/book-list';
// 为什么这样不行???
// const Annotation = reslove => (require(['./pages/book/annotation'], resolve));
import Annotation from './pages/book/annotation';
const Movie = resolve => (require(['./pages/movie/index.vue'], resolve));
const notFound = resolve => (require(['./pages/stat/404'], resolve));

// test components
import Test from 'components/list-item';

const routes = [
  {
    path: '/book',
    name: 'book',
    component: Book,
  },
  {
    path: '/movie',
    name: 'movie',
    component: Movie,
  },
  {
    path: '/',
    name: 'index',
    component: '',
    redirect: {name: 'book'},
  },
  {
    path: '/book/:bookId/detail',
    name: 'book-detail',
    component: BookDetail,
  },
  {
    path: '/book/:bookId/annotation/:annotationId',
    name: 'annotation',
    component: Annotation,
  },
  {
    path: '/book/tag/:tagId',
    name: 'book-list',
    component: BookList,
  },
  {
    path: '/test',
    name: 'test',
    component: Test,
  },
  {
    path: '*',
    name: '404',
    component: notFound,
  },
];
export default routes;

// 404 要放最后面......不然会导致前面的都访问到404
