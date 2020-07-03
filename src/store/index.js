import Vue from 'vue'
import Vuex from 'vuex'
import AuthAPI from '../api/auth'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: localStorage.authData ? JSON.parse(localStorage.authData) : null,
    currentUser: localStorage.authData ? JSON.parse(localStorage.authData).userName : null,
    error: null,
    signInStatus: null,
    signUpStatus: null
  },
  mutations: {
    setAuth(state, auth) {
      if (auth) {
        state.auth = auth;
        state.currentUser = auth.userName;
      } else {
        state.auth = null;
        state.currentUser = null;
      }
    },
    setError(state, e) {
      state.error = e;
    },
    setSignUpStatus(state, status) {
      state.signUpStatus = status;
    },
    setSignInStatus(state, status) {
      state.signInStatus = status;
    }
  },
  actions: {
    signIn({ commit }, data) {
      commit('setSignInStatus', 'signing in... ')
      return AuthAPI.signIn(data)
        .then(authentication => {
          console.log
          axios.defaults.headers['Authorization'] = 'Bearer ' + authentication.access_token
          authentication.roles = JSON.parse(authentication.roles)
          localStorage.setItem('authData', JSON.stringify(authentication))
          commit('setAuth', authentication)
          commit('setError', null)
          commit('setSignInStatus', null)
        })
        .catch((e) => {
          console.log(e);
          commit('setError', 'Authentication failed')
        })
    },
    signOut({ commit }) {
      commit('setAuth', null)
      localStorage.removeItem('authData')
    },
    signUp({ commit }, data) {
      commit('setSignUpStatus', 'loading')
      return AuthAPI.signUp(data)
        .then(account => {
          console.log(account);
          commit('setSignUpStatus', account.email)
        })
        .catch((e) => {
          console.log("sign up failed:", e);
          commit('setSignUpStatus', 'error')
        })
    }
  },

  modules: {
  }
})
