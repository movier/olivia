<template lang="html">
  <div>
    <div id="header">
      <img src="/Rectangle.png" />
      <h1>Oli Movie R</h1>
      <p>Hi, welcome to my personal website. I write about programming, travelling and life here.</p>
    </div>
    <div class="divider"></div>
    <ul id="post-list">
      <li v-for="post in posts">
        <post-list-cell :post="post"></post-list-cell>
      </li>
    </ul>
    <input type="hidden" id="loaded-signal" v-if="posts !== null">
  </div>
</template>

<script>
import PostListCell from './post-list-cell.vue';
import axios from 'axios'

export default {
  components: { PostListCell },
  computed: {
    posts () {
      return this.$store.state.posts
    }
  },
  created() {
    this.$store.dispatch('getPosts')
  }
}
</script>

<style lang="css">
body {
  margin: 0;
}
#app {
  margin: 0 auto;
}

#social-media {
  margin: 6px;
  float: right;
}

#header {
  max-width: 1080px;
  margin: auto;
  margin-top: 140px;
  margin-bottom: 80px;
  text-align: center;
  font-family: -apple-system, 'Helvetica Neue';
}

#header h1 {
  font-size: 38px;
  color: #333333;
  font-weight: bold;
  letter-spacing: normal;
}

#header p {
  font-size: 22px;
  color: #A9A9A9;
  -webkit-font-smoothing: antialiased;
}

.divider {
  height: 1px;
  background-color: #E6E6E6;
}

#post-list {
  max-width: 700px;
  margin: 80px auto;
  padding: 0;
}

#post-list li {
  list-style: none;
}
</style>
