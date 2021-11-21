// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'
// import Vuex from 'vuex';
import store from './store/index'
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vuetimeline from "@growthbunker/vuetimeline"
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// import moment from 'moment'
import './assets/iconfont/iconfont.css'
// import clipboard from 'clipboard';
import APlayer from '@moefe/vue-aplayer';


Vue.config.productionTip = false;
// Vue.use(Vuex);
// Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.use(vuetimeline);
Vue.use(APlayer, {
  productionTip: false, // disable console output
});

Vue.prototype.$moment = moment;
Vue.prototype.axios = axios;
Vue.prototype.Qs = Qs;
// Vue.prototype.clipboard = clipboard;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { 
    App
  },
  template: '<App/>'
})
