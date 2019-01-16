import Vue from 'vue'
import Vuex from 'vuex'
import api from '../../api/api'

Vue.use(Vuex)

const post = function(content) {

  if (!content.hasOwnProperty('title')) {
    throw new Error('Missing property: title')
  }

  if (typeof content.title !== 'string') {
    throw new Error('Except property title to be a string')
  }

  return content
}

const postArr = function(content) {

  if (!Array.isArray(content)) {
    throw new Error('Except an array')
  }

  content.forEach(function(element) {
    post(element)
  }, this);

  return content
}

export default new Vuex.Store({
  state: {
    posts: [] 
  },
  mutations: {
    setPosts (state, n) {
      state.posts = n
    }
  },
  actions: {
    getPosts({ commit, state }) {
      api.getAllPosts(response => {
        var arr = postArr(response.data)
        arr.forEach(function (element) {
          var options = { year: 'numeric', month: 'short', day: '2-digit' };
          element.date = new Date(element.publishedAt).toLocaleString('en-US', options).toLocaleUpperCase();
        }, this);
        commit('setPosts', response.data);
      })
    
    }
  }
})