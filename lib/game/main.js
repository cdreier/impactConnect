ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	
	'game.entities.player',
	'game.levels.lvl1',
	
	'impact.debug.debug',
	
	'plugins.impactconnect',
	'plugins.notification-manager'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	gravity: 200,
	
	note: new ig.NotificationManager(),
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.X, 'jump' );
		ig.input.bind( ig.KEY.C, 'shoot' );
		
		this.loadLevel(LevelLvl1);
		
		var player = this.getEntitiesByType(EntityPlayer)[0];
		this.gamesocket = new ig.ImpactConnect(player, 1337);
	},
	
	update: function() {
		this.parent();
		
		//keep player centered
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2;
			//this.screen.y = player.pos.y - ig.system.height/2;
		}
		
		this.note.update();
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		this.note.draw();
	},
	
	
	/**
	 * Helpers
	 */
	getEntityById: function(id){
		for(var i in this.entities){
			if(this.entities[i].id === id){
				return this.entities[i];
			}
		}
		return null;
	},
	getEntityByRemoteId: function(id){
		var tEntities = this.getEntitiesByType(EntityPlayer);
		for(var i in tEntities){
			if(tEntities[i].remoteId === id){
				return tEntities[i];
			}
		}
		return null;
	},
	write: function(text, pos){
		this.note.spawnNote(this.font, text, pos.x, pos.y, 
				{vel: { x: 0, y: 0 },  alpha: 0.5, lifetime: 2.2, fadetime: 0.3 });
	}
	
	
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 240, 160, 2 );

});
