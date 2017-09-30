/* chat system implement */

const channel = []

function createChannel(cha) {
	channel[cha] = {
		userlist: new Set(),
		chatlist: []
	}
}
exports.addUser = (cha, name) => {
	if (!(cha in channel)) {
		createChannel(cha)
	}

	if (channel[cha].userlist.has(name)) {
		return false
	}
	channel[cha].userlist.add(name)
	return true
}

exports.removeUser = (cha, name) => {
	if (!(cha in channel)) {
		createChannel(cha)
	}

	if (!channel[cha].userlist.has(name)) {
		return false
	}
	channel[cha].userlist.delete(name)
	return true
}

exports.disconnect = name => {
	for (let cha of channel) {
		cha.userlist.delete(name)
	}
}

exports.addMessage = (cha, msg) => {
	if (!(cha in channel)) {
		createChannel(cha)
	}
	channel[cha].chatlist.push(msg)
}

exports.getMessage = cha => {
	if (!(cha in channel)) {
		return null
	}
	return channel[cha].chatlist
}
exports.getUser = cha => {
	if (!(cha in channel)) {
		return null
	}
	return [...channel[cha].userlist] //to array
}