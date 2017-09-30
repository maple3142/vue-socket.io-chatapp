<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a class="navbar-brand" href="#">Chat</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item">
						<a class="nav-link" href="javascript:void(0)" @click="change">Change name</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="javascript:void(0)">{{user}}</a>
					</li>
				</ul>
				<form class="form-inline my-2 my-lg-0" @submit.prevent="join">
					<input class="form-control mr-sm-2" type="text" placeholder="Channel name" aria-label="Channel name" v-model="channel">
					<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Join</button>
				</form>
			</div>
		</nav>
		<div class="container">
			<router-view :user="user" class="p-2"></router-view>
		</div>
	</div>
</template>
<script>
import { Data } from 'vuejs-storage'
export default {
	storage: new Data({ user: null, channel: '' }, {
		name: 'App',
		storage: window.sessionStorage
	}),
	methods: {
		change() {
			let user
			if ((user = prompt('username:')) !== null && user.length > 0) {
				let channel=location.hash.slice(2)
				this.$socket.emit('leave',{user,channel})
				this.user = user
				this.$socket.emit('register', { user: this.user })
				this.$socket.emit('join', { channel })
				this.$socket.emit('getuser', { channel })
			}
		},
		join() {
			this.$router.push(this.channel ? this.channel : '/')
			this.channel = ''
		}
	},
	sockets: {
		connect() {
			this.$socket.emit('register',{user: this.user})
		}
	},
	created() {
		if (this.user === null) {
			let user
			while (!(user = prompt('username:')));
			this.user = user
		}
	}
}
</script>