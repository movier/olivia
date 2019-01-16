<template lang="html">
  <router-link :to="'blog/' + post.publishedAt.substr(0, 4)  + '/' + post.url">
    <div class="post-list" v-bind:style="{ background: post.banner_bg }">
      <h1>{{ post.title }}</h1>
      <p class="abstract">{{ post.summary }}...</p>
      <p class="date">{{ post.date }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style scoped>
a {
  display: block;
  width: 100%;
}
.post-list {
  background: linear-gradient(to bottom right, #545454, #bdbdbd);
  height: 100%;
}

.post-list h1 {
  font-size: 20px;
  font-weight: bold;
  letter-spacing: normal;
  margin: 0;
  color: white;
}

.post-list a {
  color: #333;
  text-decoration: none;
}

.post-list a:hover {
  text-decoration: underline;
}

.post-list .date, .post-list .category-and-tags {
  font-size: 12px;
  color: #9E9E9E;
}

.post-list .abstract {
  font-size: 14px;
  line-height: 24px;
  color: white;
  overflow-wrap: break-word;
}

.post-list-divider {
  margin: 30px auto;
}
</style>