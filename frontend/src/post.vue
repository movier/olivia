<template lang="html">
  <div>
    <div class="banner" v-bind:style="{ background: banner_bg }">
    
    <h1 class="entry-title">{{ title }}</h1>
    <div class="entry-meta">{{ date }} {{ tags.map(m => '#' + m).join(' ') }}</div>
    </div>
    <div class="content" v-html="compiledMarkdown"></div>
    <input type="hidden" id="loaded-signal" v-if="compiledMarkdown !== null">
  </div>
</template>

<script>
import marked from 'marked'
import api from '../api/api'

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
.entry-title, .entry-meta, .content {
    margin-left: auto;
    margin-right: auto;
    max-width: 700px;
    padding-left: 18px;
    padding-right: 18px;
}
.content {
  margin-top: 60px;
}
.entry-title {
  -webkit-font-smoothing: antialiased;
  margin-top: .42em;
  margin-bottom: .7em;
  letter-spacing: .02em;
  line-height: 1.1;
  color: white;
  font-size: 40px;
  font-weight: 800;
}
.entry-meta {
  font-size: 14px;
  color: rgba(0, 0, 0, .5);
  font-family: Helvetica Neue, sans-serif;
  font-weight: 500;
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
.content > p:first-child::first-letter {
    float:  left;
    font-size: 56px;
    line-height:  .83;
    padding-top: 3px;
    padding-right: 6px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-weight: bold;
}
</style>
