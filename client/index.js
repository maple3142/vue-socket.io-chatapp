import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, '/')
import VuejsStorage from 'vuejs-storage'
Vue.use(VuejsStorage)

import App from './vue/App'
import router from './router.js'

new Vue({
	el: '#app',
	data: {
		text: 'hello world'
	},
	components: { App },
	router
})

//webpack-hot-middleware reload
if (__DEV__) {
	if (module.hot) {
		module.hot.accept()
	}
}
