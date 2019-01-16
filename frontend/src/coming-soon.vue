<template lang="html">
  <div>
    <div class="coming-soon" v-bind:style="{ background: bg }">Coming Soon...</div>
    <input type="hidden" id="loaded-signal">
  </div>
</template>

<script>
export default {
  data() {
    return {
      bg: this.getBg(this.$route.path),
    }
  },
  methods: {
    getBg(path) {
      switch(path) {
        case '/blog':
          return 'linear-gradient(to bottom, #ff8500, #ffcd00)';
        case '/projects':
          return 'linear-gradient(to bottom, #008cff, #00ffba)';
        case '/about':
          return 'linear-gradient(to bottom, #9eff86, #a1ff00)';
        case '/hire-me':
          return 'linear-gradient(to bottom, #8800ff, #fb00ff)';
      }
    },
  },
  watch:{
    $route (to, from){
      this.bg= this.getBg(to.path);
    }
  } 
}
</script>

<style lang="css">
.coming-soon {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 44px;
    font-weight: bold;
}
</style>
