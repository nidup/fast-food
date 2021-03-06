/// <reference path="../lib/phaser.d.ts"/>

import Boot from "./states/Boot";
import Preload from "./states/Preload";
import Menu from "./states/Menu";
import Play from "./states/Play";

class SimpleGame extends Phaser.Game {

    constructor()
    {
        super(
            1000,
            600,
            Phaser.CANVAS,
            "content",
            null
        );

        this.antialias = false;

        this.state.add('Boot', Boot);
        this.state.add('Preload', Preload);
        this.state.add('Menu', Menu);
        this.state.add('Play', Play);
        this.state.start('Boot');
    }
}

window.onload = () => {
    new SimpleGame();
};
