<template lang="html">
  <div>
    <div class="write-button-container"><a class="button" href="/editor.html">Write a post</a></div>
    <ul id="post-list">
      <li v-for="post in posts">
        <cell :post="post" :onDelete="handleDelete"></cell>
      </li>
    </ul>
  </div>
</template>

<script>
import Cell from './cell.vue'
import api from '../api/api'

export default {
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    handleDelete(id) {
      api.deletePost(id, this.getData);
    },
    getData() {
      api.getPosts(posts => this.posts = posts);
    },
  },
  components: { 
    Cell,
  },
  created() {
    this.getData();
  },
}
</script>

<style lang="css">
#app {
  /* max-width: 1080px; */
  margin: 0 auto;
}

#social-media {
  margin: 6px;
  float: right;
}

/* #header {
  margin: 80px auto;
  text-align: center;
  font-family: -apple-system, 'Helvetica Neue';
} */

#header h1 {
  font-size: 38px;
  color: #333333;
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
.write-button-container {
  max-width: 700px;
  margin: 0 auto;
  margin-top: 60px;
  text-align: right;
}
.button {
  padding: 8px 16px;
  border: 1px solid rgba(0, 0, 0, .25);
  border-radius: 4px;
  text-decoration: none;
  color: rgba(0, 0, 0, .25);
  font-family: sans-serif;
  font-size: 14px;
}
.button:hover {
  border: 1px solid rgba(0, 0, 0, .45);
  color: rgba(0, 0, 0, .45);
}
</style>
