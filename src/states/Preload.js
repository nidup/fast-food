class Preload extends Phaser.State {

    preload () {
        // menu
        this.load.audio('menu-epic', '/assets/audio/Dangerous.mp3'); // thanks K. Macleod at http://incompetech.com/
        this.load.audio('sketching', '/assets/audio/pencilsketching.mp3'); // thanks netgfx for https://github.com/netgfx/Phaser-typewriter

        // game
        this.load.tilemap('map', "/assets/tilemap.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image('Desert', '/assets/Desert.png');
        this.load.image('mushrooms', '/assets/Mushroom.png');
        this.load.spritesheet('zombie1', '/assets/Zombie1.png', 40, 40, 12);
        this.load.spritesheet('zombie2', '/assets/Zombie2.png', 40, 40, 12);
        this.load.spritesheet('zombie3', '/assets/Zombie3.png', 40, 40, 12);
        this.load.spritesheet('zombie4', '/assets/Zombie4.png', 40, 40, 12);
        this.load.spritesheet('zombie5', '/assets/Zombie5.png', 40, 40, 12);
        this.load.spritesheet('zombie6', '/assets/Zombie6.png', 40, 40, 12);
        this.load.spritesheet('zombie7', '/assets/Zombie7.png', 64, 64, 12);
        this.load.spritesheet('victim1', '/assets/Victim1.png', 40, 40, 12);
        this.load.spritesheet('victim2', '/assets/Victim2.png', 40, 40, 12);
        this.load.spritesheet('victim3', '/assets/Victim3.png', 40, 40, 12);
        this.load.spritesheet('victim4', '/assets/Victim4.png', 40, 40, 12);
        this.load.spritesheet('victim5', '/assets/Victim5.png', 40, 40, 12);
        this.load.spritesheet('victim6', '/assets/Victim6.png', 40, 40, 12);
        this.load.spritesheet('explode', 'assets/explode.png', 128, 128);
        this.load.audio('explosion', '/assets/audio/explosion.mp3');
    }

    create () {
        this.game.state.start('Menu');
    }
}

export default Preload;