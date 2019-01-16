<template lang="html">
  <div class="post-list">
      <div class="date">{{ formatDate(post.updatedAt) }}</div>
      <p><a class="title" :href="'editor.html?id=' + post._id">{{ post.title }}</a></p>
      <textarea class="summary" v-on:blur="update" v-model="post.summary" placeholder="Summary Missing"></textarea>
      <p class="category-and-tags">
        分类
        <select v-model="post.category" v-on:change="update">
          <option>技术</option>
          <option>随笔</option>
          <option>旅行</option>
          <option>其他</option>
        </select>
        标签 <input style="width: 300px" v-model="post.tags" v-on:change="update" placeholder="No Tag Yet" />
      </p>
      <p class="category-and-tags">
        Banner Background <input style="width: 300px" v-model="post.banner_bg" v-on:change="update" placeholder="No Set Yet" />
      </p>
      <p class="category-and-tags">
        url <input style="width: 300px" v-model="post.url" v-on:change="update" placeholder="No Set Yet" />
      </p>
      <p class="category-and-tags">
        <a v-if="!post.isPublished" class="operation" v-on:click="publish(post._id)">发布</a>
        <a class="operation" v-on:click="deletePost(post._id)">删除</a></p>
      <div class="divider post-list-divider"></div>
  </div>
</template>

<script>
import api from '../api/api';
import moment from 'moment';

export default {
  props: [
    'post',
    'onDelete',
  ],
  methods: {
    deletePost: function (id) {
      if (confirm('Are you sure to delete this post?')) {
        this.onDelete(id);
      }
    },
    formatDate: function(dateString) {
      return moment(dateString).fromNow();
    },
    update: function () {
      if (typeof this.post.tags === 'string') {
        this.post.tags = this.post.tags.split(',');
      }
      api.updatePost(this.post._id, this.post);
    },
    publish: function (id) {
      const url = window.prompt('Please edit your post url', this.post.title.toLowerCase().split(' ').join('-')); 
      if (url) {
        api.publishPost(this.post._id, { url });
      }
    },
  }
}
</script>

<style lang="css">
  input, textarea {
    border: none;
  }
  textarea {
    height: 50px;
  }
  .title {
    font-size: 20px;
    font-weight: bold;
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
  .operation {
    cursor: pointer;
  }
</style>