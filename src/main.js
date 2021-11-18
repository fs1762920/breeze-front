// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex';
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vuetimeline from "@growthbunker/vuetimeline"
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import JsonViewer from 'vue-json-viewer'
import moment from 'moment'
import './assets/iconfont/iconfont.css'
import Clipboard from 'clipboard';


Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.use(vuetimeline);
Vue.use(JsonViewer);

Vue.prototype.$moment = moment;
Vue.prototype.Clipboard=Clipboard;

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
