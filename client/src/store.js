import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signin: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    fullname: localStorage.getItem('fullname') ? localStorage.getItem('fullname') : '',
    register: false,
  },
  mutations: {
    mutateSigninStatus(state, data) {
      state.signin = data.signin;
      state.fullname = data.fullname;
    },
  },
  actions: {

  },
});
