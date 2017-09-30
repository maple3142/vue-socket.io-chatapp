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

exports.clear = name => {
	let chs=[]
	for (let ch in channel) {
		let cha=channel[ch]
		if (cha.userlist.has(name)) {
			chs.push(ch)
			cha.userlist.delete(name)
		}
	}
	return chs
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