ig.module(
	'plugins.impactconnect'
)
.requires(
	'impact.impact'
).defines(function() {

	ig.ImpactConnect = ig.Class.extend({
		
		init : function(player, port) {
			this.remoteId;
			//reconnecting wont work for now
			this.socket = io.connect('http://localhost:'+port, {
					'reconnect' : true,
					'reconnection delay' : 500,
					'max reconnection attempts' : 10
				});


			/**
			 * starts communication with server
			 */
			this.socket.emit('start');
			
			
			/**
			 * joining game
			 */
			this.socket.on('setRemoteId', function(rId){
				player.remoteId = rId;
				this.remoteId = rId;
			});
			this.socket.on('join', function(data){
				console.log(this.remoteId);
				if(data.remoteId != this.remoteId){
					ig.game.spawnEntity(EntityPlayer, 0, 0,{
						handlesInput: false,
						gravityFactor: 0,
						remoteId: data.remoteId
					});
				}
			});
			
			
			/**
			 * spawns simple entity you cant control
			 * info: class comes as string and needs the eval, because socket.io (?) strips all prototypes
			 */
			this.socket.on('spawnSimpleEntity', function(data){
				ig.game.spawnEntity(eval(data.ent), data.x, data.y, data.settings);
			});
			
			
			
			/**
			 * moving and animations
			 */
			this.socket.on('move', function(data){
				try{
					var ent = ig.game.getEntityByRemoteId( data.remoteId );
					ent.pos.x = data.pos.x;
					ent.pos.y = data.pos.y;
					if(ent.remoteAnim != data.remoteAnim){
						
						var newAnim = "ent.anims."+data.remoteAnim;
						ent.currentAnim = eval(newAnim);
						
						ent.currentAnim.flip.x = data.flipped;
						ent.remoteAnim = data.remoteAnim;
					}
				}catch(e){
					//entity null
					console.log("catched: "+e);
				}
			});
			
			
			/**
			 * disconnecting and removing
			 */
			this.socket.on('disconnect', function() {
				//reconnecting if not wanted to disconnect?
			});
			
			this.socket.on('removed', function(data) {
				try{
					var ent = ig.game.getEntityByRemoteId( data.remoteId );
					ent.kill();
				}catch(e){
					//entity null
					console.log("catched: "+e);
				}
			});
			
		},
		
		
		/**
		 * universal broadcasting method
		 */
		send: function(name, data){
			this.socket.emit("impactconnectbroadcasting", {
					name: name,
					data: data
				});
		}
		
		
		
		
		
	});
});
