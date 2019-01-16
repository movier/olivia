import axios from 'axios'

const url = "http://localhost:1102/"
axios.defaults.withCredentials = true;

export default { 
  getAllPosts (cb) {
    axios.get(url).then(response => {
      cb(response)
    }).catch(e => {
      console.error(e)
    })
  },

  getPostDetail (id, cb, errorCb) {
    axios.get(url + 'post/' + id).then(response => {
      cb(response)
    }).catch(e => {
      errorCb()
    })
  },

  getPosts (cb) {
    axios.get(url + 'posts')
    .then(response => cb(response.data))
    .catch(err => console.error(err));
  },

  getPostById (id, cb) {
    axios.get(url + 'post-by-id/' + id)
    .then(response => cb(response.data))
    .catch(err => console.error(err));
  },

  deletePost (id, cb) {
    axios.delete(url + 'post/' + id)
      .then(() => cb())
      .catch(err => console.error(err));
  },

  updatePost (id, body) {
    axios.patch(url + 'post/' + id, body);
  },
  
  publishPost (id, body) {
    axios.patch(url + 'post/publish/' + id, body);
  },

}
