<template lang="html">
  <div class="post-container">
    <h1 class="entry-title">{{ title }}</h1>
    <div class="entry-meta">{{ date }} {{ tags.map(m => '#' + m).join(' ') }}</div>
    <div class="content" v-html="compiledMarkdown"></div>
    <input type="hidden" id="loaded-signal" v-if="compiledMarkdown !== null">
  </div>
</template>

<script>
import marked from 'marked'
import api from '../../../api/api'

export default {
  data() {
    return {
      title: null,
      date: null,
      category: null,
      tags: [],
      compiledMarkdown: null,
      banner_bg: null,
    }
  },
  beforeRouteEnter (to, from, next) { 
    api.getPostDetail(
      to.params.id,
      (response) => {
        next(vm => {
          vm.title = response.data.title
          var options = { year: 'numeric', month: 'short', day: '2-digit' };
          vm.date = new Date(response.data.publishedAt).toLocaleString('en-US', options);
          vm.category = response.data.category
          vm.tags = response.data.tags
          vm.banner_bg = response.data.banner_bg
          vm.compiledMarkdown = marked(response.data.text)
        })
      },
      () => next(false)
    )
  }
}
</script>

<style lang="css">
.post-container {
  margin-top: 120px;
  margin-bottom: 100px;
}
.entry-title, .entry-meta, .content {
    margin-left: auto;
    margin-right: auto;
    max-width: 700px;
    padding-left: 18px;
    padding-right: 18px;
}
.entry-title, .entry-meta {
  text-align: center;
}
.entry-title {
  -webkit-font-smoothing: antialiased;
  margin-top: 0;
  letter-spacing: .02em;
}
.entry-meta {
  font-size: 14px;
  color: #9e9e9e; 
}
.content {
  margin-top: 30px;
}
.content img {
  max-width: 100%;
  display: block;
  margin: auto;
}
pre {
  padding: 10px;
  overflow: auto;
  border: #E3EDF3 1px solid;
  background: #F7FAFB;
}
.banner {
  padding: 160px 0;
  text-align: center;
  background: linear-gradient(to bottom, #545454, #bdbdbd);
}
</style>
