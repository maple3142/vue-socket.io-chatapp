<template>
	<div>
		<vue-toast ref='toast'></vue-toast>
		<h3>#{{channel}}</h3>
		<div class="row">
			<div class="col-8">
				<div class="messages">
					<div class="card" v-for="(msg,idx) in chatlist" :key="idx">
						<div class="card-body">
							<h4 class="card-title">{{msg.user}}</h4>
							<p class="card-text">{{msg.msg}}</p>
						</div>
					</div>
				</div>
				<div class="input-group">
					<input type="text" class="form-control" placeholder="type here..." aria-label="type here..." v-model="text" @keydown.enter="send">
					<span class="input-group-btn">
						<button class="btn btn-primary" type="button" @click="send">Send</button>
					</span>
				</div>
			</div>
			<div class="col-4">
				<ul class="list-group">
					<li v-for="(usr,idx) in userlist" :key="idx" class="list-group-item">{{usr}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import 'vue-toast/dist/vue-toast.min.css'
import VueToast from 'vue-toast'

import page from './page'
import { Data } from 'vuejs-storage'

export default {
	components: { VueToast },
	mixins: [page],
	storage() {
		let channel = location.hash.slice(2)
		return new Data(
			{
				channel,
				chatlist: [],
				userlist: [],
				text: ''
			}, {
				name: 'chat'
			})
	},
	beforeRouteUpdate(to, from, next) {
		this.$socket.emit('leave', { channel: this.channel })
		this.channel = to.params.channel
		document.title = `Chat #${this.channel}`
		this.$socket.emit('join', { channel: this.channel })
		this.$socket.emit('getuser', { channel: this.channel })
		next()
	},
	sockets: {
		chat(list) {
			this.chatlist = list
		},
		getuser(list) {
			this.userlist = list
		},
		join({ channel, user }) {
			if (channel === this.channel && user !== this.user) {
				this.toast.showToast(`User ${user} joined`, { theme: 'success', timeLife: 3000 })
			}
			this.$socket.emit('getuser', { channel: this.channel })
		},
		leave({ channel, user }) {
			if (channel === this.channel && user !== this.user) {
				this.toast.showToast(`User ${user} leaved`, { theme: 'error', timeLife: 3000 })
			}
			this.$socket.emit('getuser', { channel: this.channel })
		},
		disc({ channel, user }) {
			if (channel.includes(this.channel) && user !== this.user) {
				this.toast.showToast(`User ${user} leaved`, { theme: '', timeLife: 3000 })
			}
			this.$socket.emit('getuser', { channel: this.channel })
		}
	},
	mounted() {
		this.$socket.emit('join', { channel: this.channel })
		this.$socket.emit('getuser', { channel: this.channel })

		this.channel = this.$route.params.channel
		document.title = `Chat #${this.channel}`
		this.chatlist = ''

		console.log(this.$refs, this.$refs.toast)
		this.$refs.toast.setOptions({
			position: 'bottom right'
		})
		this.toast = this.$refs.toast
	},
	destroyed() {
		this.$socket.emit('leave', { channel: this.channel })
	},
	methods: {
		send() {
			this.$socket.emit('chat', { channel: this.channel, msg: this.text })
			this.text = ''
		}
	}
}
</script>
<style scoped>
.messages {
	overflow-y: scroll;
	height: 70vh;
}

.messages::-webkit-scrollbar {
	display: none;
}
</style>
