import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './theme/2017/app.vue'
import Post from './theme/2017/post.vue'
import Cell from './post-list-cell.vue'
import myNav from './nav.vue'
import store from './store'
import Edit from './edit.vue'
import Admin from './admin.vue'
import ComingSoon from './coming-soon.vue';
import * as ColorBlog from './theme/color/blog.vue';

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter)

// 2. Define route components
const NotFoundComponent = { template: '<div>404</div>'}

// 3. Create the router
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: App },
    { path: '/blog', component: ComingSoon  },
    { path: '/hire-me', component: ComingSoon  },
    { path: '/about', component: ComingSoon  },
    { path: '/blog/:year(\\d{4})/:id', component: Post },
    { path: '/admin', component: Admin },
    { path: '/projects', component: ComingSoon  },
    { path: '*', component: NotFoundComponent },
  ],
  // Simply make the page scroll to top for all route navigations
  // 
  // TODO: but this will cause a problem that user will see top of
  //       current page first and then redirect
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.
new Vue({
  router,
  store,
  components: { myNav },
  template: `
    <div id="app">
      <my-nav></my-nav>
      <transition name="fade">
        <router-view class="view"></router-view>
      </transition>
      <p class="copyright">Copyright © 2022 olimovier.com - All Rights Reserved.</p>
    </div>
  `
}).$mount('#app')
