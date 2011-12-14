var io = require('socket.io').listen(1337);

io.sockets.on('connection', function(socket) {

	io.set('log level', 1);
	
	/**
	 * starting
	 * sending remoteId to client who is joining
	 * broadcasting remoteId to anyone else that new client joined
	 */
	socket.on('start', function(){
		socket.emit('setRemoteId', socket.id);
		console.log("broadcast new player with remote id "+socket.id);
		socket.broadcast.emit('join', {remoteId:socket.id});
		
		//send all existing clients to new
		for(var i in io.sockets.sockets){
			socket.emit('join', {remoteId: i});
		}
		
	});

	

	/**
	 * universal broadcasting method
	 */
	socket.on('impactconnectbroadcasting', function(data) {
		socket.broadcast.emit(data.name, data.data);
	});


	
	/**
	 * disconnecting
	 */
	socket.on('disconnect', function() {
		console.log("disconnecting: "+socket.id);
		socket.broadcast.emit('removed', {remoteId: socket.id});
	});

	
});



