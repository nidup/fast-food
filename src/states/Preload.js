class Preload extends Phaser.State {

    preload () {
        // thanks K. Macleod at http://incompetech.com/
        this.load.audio('menu-epic', 'assets/audio/Dangerous.mp3');
        // thanks netgfx for https://github.com/netgfx/Phaser-typewriter
        this.load.audio('sketching', 'assets/audio/pencilsketching.mp3');
        // thanks http://phaser.io/examples/v2/games/invaders
        this.load.audio('explosion', 'assets/audio/explosion.mp3');
        // thanks bart http://opengameart.org/content/25-spooky-sound-effects
        this.load.audio('brains1', 'assets/audio/spookysounds/brains.wav');
        this.load.audio('brains2', 'assets/audio/spookysounds/brains2.wav');
        this.load.audio('brains3', 'assets/audio/spookysounds/brains3.wav');
        this.load.audio('crackly_groan', 'assets/audio/spookysounds/crackly_groan.wav');
        this.load.audio('creak1', 'assets/audio/spookysounds/creak1.wav');
        this.load.audio('creak2', 'assets/audio/spookysounds/creak2.wav');
        this.load.audio('creak3', 'assets/audio/spookysounds/creak3.wav');
        this.load.audio('creak4', 'assets/audio/spookysounds/creak4.wav');
        this.load.audio('creak5', 'assets/audio/spookysounds/creak5.wav');
        this.load.audio('creak6', 'assets/audio/spookysounds/creak6.wav');
        this.load.audio('creak7', 'assets/audio/spookysounds/creak7.wav');
        // thanks Russintheus http://www.freesound.org/people/Russintheus/sounds/165089/#
        this.load.audio('countdown', 'assets/audio/165089__russintheus__countdown-boom.mp3');
        // thanks Curt http://opengameart.org/content/zombie-rpg-sprites
        this.load.spritesheet('zombie1', 'assets/sprites/Zombie1.png', 40, 40, 12);
        this.load.spritesheet('zombie2', 'assets/sprites/Zombie2.png', 40, 40, 12);
        this.load.spritesheet('zombie3', 'assets/sprites/Zombie3.png', 40, 40, 12);
        this.load.spritesheet('zombie4', 'assets/sprites/Zombie4.png', 40, 40, 12);
        this.load.spritesheet('zombie5', 'assets/sprites/Zombie5.png', 40, 40, 12);
        this.load.spritesheet('zombie6', 'assets/sprites/Zombie6.png', 40, 40, 12);
        this.load.spritesheet('zombie7', 'assets/sprites/Zombie7.png', 64, 64, 12);
        this.load.spritesheet('victim1', 'assets/sprites/Victim1.png', 40, 40, 12);
        this.load.spritesheet('victim2', 'assets/sprites/Victim2.png', 40, 40, 12);
        this.load.spritesheet('victim3', 'assets/sprites/Victim3.png', 40, 40, 12);
        this.load.spritesheet('victim4', 'assets/sprites/Victim4.png', 40, 40, 12);
        this.load.spritesheet('victim5', 'assets/sprites/Victim5.png', 40, 40, 12);
        this.load.spritesheet('victim6', 'assets/sprites/Victim6.png', 40, 40, 12);
        this.load.spritesheet('explode', 'assets/sprites/explode.png', 128, 128);
        // thanks http://rswhite.de/dgame5/?page=tutorial&tut=spritesheets
        this.load.spritesheet('finalexplosion', 'assets/sprites/final-explosion.png', 256, 256);

        this.load.image('Desert', 'assets/tilemaps/tiles/Desert.png');
        this.load.tilemap('map', "assets/tilemaps/maps/level1.json", null, Phaser.Tilemap.TILED_JSON);
    }

    create () {
        this.game.state.start('Menu');
    }
}

export default Preload;