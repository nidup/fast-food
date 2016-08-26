import Boot from 'states/Boot';
import Preload from 'states/Preload';
import Menu from 'states/Menu';
import Play from 'states/Play';

class Game extends Phaser.Game {

    constructor() {
        super (1000, 600, Phaser.CANVAS, 'content');
        this.state.add('Boot', Boot);
        this.state.add('Preload', Preload);
        this.state.add('Menu', Menu);
        this.state.add('Play', Play);
        this.state.start('Boot');
    }

}

new Game();
