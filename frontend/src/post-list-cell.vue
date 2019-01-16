<template lang="html">
  <div class="post-list">
      <p class="date">{{ post.date }}</p>
      <router-link :to="'blog/' + post.publishedAt.substr(0, 4)  + '/' + post.url"><h1>{{ post.title }}</h1></router-link>
      <p class="summary">{{ post.summary }}...</p>
      <p class="category-and-tags">{{ post.tags.map(m => '#'+ m).join(' ') }}</p>
      <div class="divider post-list-divider"></div>
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style lang="css">
  .post-list h1 {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: normal;
    margin: 0;
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

  .post-list .summary {
    font-size: 14px;
    line-height: 24px;
    color: #333;   
    overflow-wrap: break-word;

  }

  .post-list-divider {
      margin: 30px auto;
  }
</style>