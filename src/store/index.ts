import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    setIsLogin(state, value) {
      state.isLogin = value;
    }
  },
  actions: {
    isLogin(state: any) {
      return state.isLogin;
    }
  },
  modules: {}
});
