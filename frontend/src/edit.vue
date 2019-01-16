<template>
  <div>
    <span>Multiline message is:</span>
    <!-- <div v-html="controlledMsg"></div> -->
    <textarea 
      placeholder="write Markdown" 
      v-model="message" 
      v-bind:class="classObject"></textarea>
  </div>
</template>
<script>
import marked from 'marked'
export default {
  data () {
    return {
      message: ''
    }
  },
  computed: {
    controlledMsg () {
      return this.message
    },
    classObject () {
        console.log(this.message)
      return {
        h1: this.message.substring(0, 2) === '# '
      }
    }
  }
}
</script>
<style>
textarea {
  width: 100%;
  height: 400px;
}
.h1 {
  font-size: 24px;
}
</style>
