import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import App from './vue/App'
import home from './vue/home'
import chat from './vue/chat'

const routes=[
	{ path: '/', component: home },
	{path: '/:channel',component: chat}
]

const router=new VueRouter({routes})

export default router