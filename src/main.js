import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design';
import moment from 'moment'
import store from '../src/store'
import 'view-design/dist/styles/iview.css';

Vue.use(router);
Vue.use(ViewUI);

Vue.config.productionTip = false



Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)

})
new Vue({
  router,store,
  render: h => h(App)
}).$mount('#app')
