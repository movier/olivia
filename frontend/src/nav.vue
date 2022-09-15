<template lang="html">
  <div id="nav" v-if="currentRoutePath !== '/'">
    <!-- <div class="nav-left">
      <div class="nav-item"><router-link to="/blog">BLOG</router-link></div>
      <div class="nav-item"><router-link to="/projects">PROJECTS</router-link></div>
    </div> -->
    <div style="margin: auto" >
      <router-link to="/"><img height="32" id="logo" src="/avatar.jpg" style="border-radius: 50%;"/></router-link>
    </div>
    <!-- <div class="nav-right">
      <div class="nav-item"><router-link to="/about">ABOUT</router-link></div>
      <div class="nav-item"><router-link to="/hire-me">HIRE ME</router-link></div>
    </div> -->
    <!-- <p id="social-media"><a href="https://twitter.com/olimovier">Twitter</a> / <a href="https://www.instagram.com/olimovier/">Instagram</a> / <a href="/feed.xml">RSS</a></p> -->
  </div>
</template>

<script>
export default {
  computed: {
    currentRoutePath() {
      return this.$route.fullPath;
    }
  },
}
</script>

<style lang="css">
  #nav a {
    text-decoration: none;
  }
  #nav {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 55px;
    margin: 0 28px;
    display: flex;
    align-items: center;
    font-size: 13px;
    font-family: Helvetica, sans-serif;
    font-weight: bold;
    color: rgba(0, 0, 0, .48);
    border-bottom: 1px solid rgba(0, 0, 0, .05);
  }
  #nav::after {
    height: 1px;
    color: rgba(0, 0, 0, .05);
  }
  .nav-left, .nav-right {
    flex: 1;
    display: flex;
  }
  .nav-right {
    justify-content: flex-end;
  }
  .nav-left > .nav-item {
    padding-right: 12px;
  }
  .nav-right > .nav-item {
    padding-left: 12px;
  }
  #social-media a {
    font-family: -apple-system;
    color: #8B572A;
  }
  #social-media a:hover {
    color: #733F10;
  }
</style>