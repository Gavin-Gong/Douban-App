// const MIcon = resolve => (require(['components/m-icon'], resolve))
const Book = resolve => (require(['./pages/book/index.vue'], resolve))
const BookDetail = resolve => (require(['./pages/book/book-detail'], resolve))
const Movie = resolve => (require(['./pages/movie/index.vue'], resolve))
const routes = [
  {
    path: '/book',
    name: 'book',
    component: Book
  },
  {
    path: '/movie',
    name: 'movie',
    component: Movie
  },
  {
    path: '/',
    name: 'index',
    component: '',
    redirect: {name: 'book'}
  },
  {
    path: '/book/:id/detail',
    name: 'book-detail',
    component: BookDetail
  }
]
export default routes
