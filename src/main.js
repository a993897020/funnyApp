// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueRouter from "vue-router"
import "lib-flexible/flexible"
import '../static/css/reset.css'
import { routes } from './routes'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer' //图片
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer)

Vue.config.productionTip = false
Vue.prototype.http=axios
axios.defaults.baseURL="https://www.apiopen.top"
Vue.use(VueRouter)
const router=new VueRouter({
  mode:"history",
  routes,
  linkActiveClass:"active"
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
