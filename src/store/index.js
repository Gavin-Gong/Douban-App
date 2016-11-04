import Vuex from 'vuex';
import showCase from './modules/show-case';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    showCase,
  },
});
export default store;
