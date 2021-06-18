import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userid: null,
    username: null,
    nickname: null,
  },
  mutations: {
    initInfo(state, payload) {
      state.userid = payload.userid
      state.username = payload.username
      state.nickname = payload.nickname
    },
  },
  actions: {
  },
  modules: {
  },
});
