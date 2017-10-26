// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueStash from 'vue-stash';
import App from './App'
import router from './router'
import store from './store/store'
import VueMoment from 'vue-moment'
import moment from 'moment'
import Vuetify from 'vuetify'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(VueStash)
Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(VueMoment, {moment})

new Vue({
	el: '#app',
	data: {store},
	router,
	template: '<App/>',
	components: {
		App
	}
})
