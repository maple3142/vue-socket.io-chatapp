const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

if (process.env.NODE_ENV === 'development') {
	require('./dev')(app)
}

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

http.listen(3000, () => {//dev port
	console.log('server started')
})

const chat=require('./chat')

const idtable={}
io.on('connection', socket => {
	console.log(`${socket.id} connected`)
	socket.emit('connect')
	socket.on('register', ({user}) => {
		idtable[socket.id] = user
		console.log(`user: ${user} registered`)
	})
	socket.on('join', ({channel}) => {
		let user=idtable[socket.id]
		chat.addUser(channel, user)

		io.emit('join', { channel, user })
		socket.emit('chat', chat.getMessage(channel))
		
		console.log(`${user} join #${channel}`)
	})
	socket.on('leave', ({channel}) => {
		let user=idtable[socket.id]
		chat.removeUser(channel, user)

		io.emit('leave', { channel, user })
		
		console.log(`${user} leave #${channel}`)
	})
	socket.on('disconnect', () => {
		let user = idtable[socket.id]
		chat.disconnect(user)

		io.emit('disconnect', { user })
		
		console.log(`${user} disconnected`)
	})
	socket.on('chat', ({ channel, msg }) => {
		let user=idtable[socket.id]
		chat.addMessage(channel, {msg,user})
		
		io.emit('chat', chat.getMessage(channel))
		
		console.log(`${user} send ${msg} on #${channel}`)
	})
	socket.on('getuser', ({ channel }) => {
		socket.emit('getuser',chat.getUser(channel))
	})
})