<template lang="html">
  <div>
    <div class="container">
      <template v-for="(post, index) in posts">
        <div v-bind:class="classObject(index)">
          <cell class="rectangle" :post="post"></cell>
        </div>
      </template>
    </div>
    <input type="hidden" id="loaded-signal" v-if="posts !== null">
  </div>
</template>
  
<script>
  import Cell from './cell.vue';

  export default {
    components: {
      Cell
    },
    computed: {
      posts () {
        return this.$store.state.posts;
      },
    },
    methods: {
      classObject: function (index) {
        return { [`item-${index % 8 + 1}`]: true };
      },
    },
    created() {
      this.$store.dispatch('getPosts')
    }
  }
</script>
  
<style lang="css" scoped>
  body {
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  .container {
    max-width: 700px;
    margin: 80px auto;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }
  .item-1 {
    grid-column-start: 1;
    grid-column-end: 7;
  }
  .item-2 {
    grid-column-start: 7;
    grid-column-end: 10;
  }
  .item-3 {
    grid-column-start: 10;
    grid-column-end: 13;
  }
  .item-4 {
    grid-column-start: 7;
    grid-column-end: 10;
  }
  .item-5 {
    grid-column-start: 10;
    grid-column-end: 13;
  }
  .item-6 {
    grid-column-start: 1;
    grid-column-end: 5;
  }
  .item-7 {
    grid-column-start: 5;
    grid-column-end: 9;
  }
  .item-8 {
    grid-column-start: 9;
    grid-column-end: 13;
  }
</style>
  