ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	
	'game.entities.player',
	'game.levels.lvl1',
	
	'impact.debug.debug',
	
	'plugins.impactconnect'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	gravity: 200,
	
	players: [],
	
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
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
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
	}
	
	
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 240, 160, 2 );

});
