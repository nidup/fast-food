import Zombie from 'objects/Zombie';
import Victim from 'objects/Victim';
import Hero from 'objects/Hero';

class Play extends Phaser.State {

    constructor (game) {
        super (game);

        this.map = null;
        this.layer = null;

        this.hero = null;
        this.startX = null;
        this.startY = null;

        this.zombies = [];
        this.victims = [];

        this.cursors = null;
        this.frameRate = 5;

        this.mainText = null;

        this.easystar = null;

        this.wallIndexes = [
            1, 2, 3,
            9, 10, 11,
            17, 18, 19, 20, 21,
            25, 26, 27, 28, 29,
            33, 34, 35, 36, 37,
            41, 42, 43, 44, 45
        ];

        this.shakesCount = 0;

        this.timerText = null;
        this.levelTime = 120;
        this.timer;
        this.timerEvent;
    }

    create() {
        this.game.time.advancedTiming = true;

        this.cursors = this.input.keyboard.createCursorKeys();

        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('Desert');
        this.layer = this.map.createLayer('Ground');
        this.layer.resizeWorld();

        this.map.setCollision(this.wallIndexes);

        var characters = this.map.objects['Characters'];

        for (var i = 0; i < characters.length; i++) {
            if (characters[i].type == 'zombie') {
                this.zombies.push(new Zombie(this, characters[i].name, {x: characters[i].x, y: characters[i].y}));
            } else if (characters[i].type == 'victim') {
                this.victims.push(new Victim(this, characters[i].name, {x: characters[i].x, y: characters[i].y}));
            } else if (characters[i].type == 'hero') {
                this.startX = characters[i].x;
                this.startY = characters[i].y;
                this.hero = new Hero(this, characters[i].name, {x: this.startX, y: this.startY});
            } else {
                console.error(characters[i]);
            }
        }

        this.camera.follow(this.hero.sprite);

        this.easystar = new EasyStar.js();
        var grid = [];
        var tileRows = this.map.layer.data;
        for (var y = 0; y < tileRows.length; y++) {
            grid[y] = [];
            for (var x = 0; x < tileRows[y].length; x++) {
                if (this.wallIndexes.indexOf(tileRows[y][x].index) == -1) {
                    grid[y][x] = 0;
                } else {
                    grid[y][x] = 1;
                }
            }
        }
        this.easystar.setGrid(grid);
        this.easystar.setAcceptableTiles([0]);
        this.easystar.enableDiagonals();

        this.timer = this.time.create();
        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * this.levelTime, this.endTimer, this);
        this.timer.start();

        var style = { font: "bold 32px FeastOfFlesh", fill: "#ff0044", boundsAlignH: "center", boundsAlignV: "middle" };
        this.timerText = this.add.text(this.camera.x, this.camera.y, '', style);
        this.timerText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
        this.timerText.fixedToCamera = true;

        this.mainText = this.game.add.text(0, 0, '', style);
        this.mainText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
        this.mainText.setTextBounds(0, 220, 800, 100);

        this.mainText.fixedToCamera = true;
        var spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.togglePause, this);
        this.togglePause();
    }

    update () {

        this.hero.update(this.zombies, this.victims);
        this.hero.move(this.cursors);

        for (var i=0; i<this.zombies.length; i++) {
            this.zombies[i].update(this.zombies);
            this.zombies[i].move(this.hero, this.victims);
        }

        for (var i=0; i<this.victims.length; i++) {
            if (this.victims[i].isDead == false) {
                this.victims[i].update(this.zombies, this.victims);
                this.victims[i].move(this.hero);

            } else {
                this.transformVictimToZombie(this.victims[i]);
                this.victims.splice(i, 1);
            }
        }

        if (this.hero.isDead) {
            this.transformHeroToZombie();
        }

        this.updateCamera();
    }

    render() {

        this.game.debug.text(this.time.fps || '--', 2, 14, "#00ff00");
        if (this.timer.running) {
            this.timerText.setText(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)));
        } else {
            this.game.debug.text("Done!", 2, 14, "#0f0");
        }
    }

    endTimer () {
        this.timer.stop();
    }

    formatTime (s) {
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);

        return minutes.substr(-2) + ":" + seconds.substr(-2);
    }

    transformVictimToZombie(victim) {
        var zombieSpriteKey = 'zombie' + victim.sprite.key.slice(-1);
        var newZombie = new Zombie(this, zombieSpriteKey, {x: victim.sprite.x, y: victim.sprite.y});
        newZombie.state = newZombie.HUNT;
        this.zombies.push(newZombie);
        this.displayMessage('Eaten, one more Zombie! Run! Run!', 2000);
        victim.destroy();
        this.shakeCamera(20);
    }

    transformHeroToZombie() {
        var zombieSpriteKey = 'zombie' + this.hero.sprite.key.slice(-1);
        var newZombie = new Zombie(this, zombieSpriteKey, {x: this.hero.sprite.x, y: this.hero.sprite.y});
        newZombie.state = newZombie.HUNT;
        this.zombies.push(newZombie);
        this.displayMessage('You\'re now one of us ...', 2000);
        this.hero.destroy();

        // TODO: check if there is a zombie here to avoid the re-spawn bug. bug on pause!
        // this.hero = new Hero(this, 'victim1', {x: this.startX, y: this.startY});
        var firstVictim = this.victims.shift();
        this.hero = new Hero(this, firstVictim.key, {x: firstVictim.sprite.x, y: firstVictim.sprite.y});
        firstVictim.destroy();
        this.shakeCamera(20);
        this.togglePause();
    }

    togglePause() {
        this.game.physics.arcade.isPaused = (this.game.physics.arcade.isPaused) ? false : true;
        if (this.game.physics.arcade.isPaused == true) {
            this.displayMessage('Pause! (press space to continue)', 100000);
            this.timer.pause();
        } else {
            this.mainText.setText('');
            this.timer.resume();
        }
    }

    displayMessage(content, time) {
        this.mainText.setText(content);
        this.game.time.events.add(time, function () { this.setText(''); }, this.mainText);
    }

    shakeCamera(count) {
        this.shakesCount = count;
    }

    updateCamera() {
        if(this.shakesCount > 0){
            this.camera.unfollow();
            var sens = this.shakesCount * 0.5;
            var shakeX = 10;
            if(this.shakesCount % 2){
                this.camera.x += shakeX ? sens : 0;
            } else{
                this.camera.x -= shakeX ? sens : 0;
            }
            this.shakesCount--;
        } else {
            this.camera.follow(this.hero.sprite);
        }
    }
}

export default Play;