<template>
	<div>
		channel: {{channel}}
		<ul>
			<li v-for="(msg,idx) in chatlist" :key="idx">{{msg.user}}: {{msg.msg}}</li>
		</ul>

		<ul>
			<li v-for="(usr,idx) in userlist" :key="idx">{{usr}}</li>
		</ul>
		<form>
			<input type="text" v-model="text">
			<button @click="send">send</button>
		</form>
	</div>
</template>
<script>
import page from './page'
import { Data } from 'vuejs-storage'
export default {
	mixins: [page],
	storage() {
		let channel = location.hash.slice(2)
		return new Data({
			channel,
			chatlist: [],
			userlist: [],
			text: ''
		}, {
			name: 'chat'
		})
	},
	beforeRouteUpdate(to, from, next) {
		this.$socket.emit('leave',{channel: this.channel})
		this.channel = to.params.channel
		this.$socket.emit('join', { channel: this.channel })
		this.$socket.emit('getuser', { channel: this.channel })
		next()
	},
	sockets: {
		connect() {
			this.$socket.emit('join', { channel: this.channel })
			this.$socket.emit('getuser', { channel: this.channel })	
		},
		chat(list) {
			this.chatlist=list
		},
		getuser(list) {
			this.userlist=list
		}
	},
	created() {
		this.channel=this.$route.params.channel	
	},
	methods: {
		send() {
			this.$socket.emit('chat', { channel: this.channel, msg: this.text })
			this.text=''
		}
	}
}
</script>