
import * as EasyStar from "../../node_modules/easystarjs"
import Hero from "../objects/Hero";
import Zombie from "../objects/Zombie";
import Victim from "../objects/Victim";

export default class Play extends Phaser.State
{
    public hero: Hero;
    public zombies: Array<Zombie>;
    public victims: Array<Victim>;

    public map;
    public layer;
    public easystar;
    public exitX: number;
    public cursors: Phaser.CursorKeys;

    private startX: number;
    private startY: number;
    private frameRate: number;
    private wallIndexes: Array<number>;
    private mainText;
    private shakesCount: number;
    private timerText;
    private levelTime: number;
    private remainingTime: number;
    private timer;
    private timerEvent;
    private playCountdown: boolean;
    private playExplosion: boolean;
    private finalSprite;
    private countdownAudio;

    create() {
        this.map = null;
        this.layer = null;
        this.hero = null;
        this.startX = null;
        this.startY = null;
        this.zombies = [];
        this.victims = [];
        this.exitX = 9300;
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
        this.shakesCount = null;
        this.timerText = null;
        this.levelTime = null;
        this.remainingTime = null;
        this.timer = null;
        this.timerEvent = null;


        this.levelTime = 120;
        this.remainingTime = this.levelTime;
        this.shakesCount = 0;
        this.playCountdown =false;
        this.playExplosion = false;

        this.game.time.advancedTiming = true;

        this.cursors = this.input.keyboard.createCursorKeys();

        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('Desert');
        this.layer = this.map.createLayer('Ground');
        this.layer.resizeWorld();

        this.layer.debug = true;

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

        this.timerText = this.add.text(this.camera.x, this.camera.y, '', this.getFontStyle(32));
        this.timerText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
        this.timerText.setTextBounds(10, 10, 800, 100);
        this.timerText.fixedToCamera = true;

        this.mainText = this.game.add.text(0, 0, '', this.getFontStyle(32));
        this.mainText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
        this.mainText.setTextBounds(250, 220, 800, 100);

        this.mainText.fixedToCamera = true;

        var zombieAudios = [
            this.game.add.audio('brains1'),
            this.game.add.audio('brains2'),
            this.game.add.audio('brains3'),
            this.game.add.audio('crackly_groan'),
            this.game.add.audio('creak1'),
            this.game.add.audio('creak2'),
            this.game.add.audio('creak3'),
            this.game.add.audio('creak4'),
            this.game.add.audio('creak5'),
            this.game.add.audio('creak6'),
            this.game.add.audio('creak7'),
        ];
        this.game.time.events.loop (
            1500, function () {
                var zombieAudio = zombieAudios[Math.floor(Math.random() * zombieAudios.length)];
                zombieAudio.play();
            }, this);

        this.countdownAudio = this.game.add.audio('countdown');
    }

    update () {

        if (this.hero.isSafe == true) {
            this.displayMessage('Congratz! Out of hell!!!', 0)
            this.timer.add(Phaser.Timer.SECOND * 3, this.openMenu, this);

            return;
        }

        if (this.hero.isDead == true) {
            this.transformHeroToZombie();

            return;
        }

        this.hero.play();

        for (var i = 0; i < this.zombies.length; i++) {
            this.zombies[i].play();
        }

        for (var i = 0; i < this.victims.length; i++) {
            if (this.victims[i].isDead == false) {
                this.victims[i].play();

            } else {
                this.transformVictimToZombie(this.victims[i]);
                this.victims.splice(i, 1);
            }
        }

        this.updateCamera();
    }

    render()
    {
        const fps = this.time.fps ? this.time.fps.toString() : '--';
        this.game.debug.text(fps, 2, 14, "#00ff00");
        if (this.timer.running) {

            this.game.debug.body(this.hero.sprite);

            this.remainingTime = Math.round((this.timerEvent.delay - this.timer.ms) / 1000);
            this.timerText.setText(this.formatTime(this.remainingTime));
            if (this.remainingTime == 20 && this.playCountdown == false) {
                this.playCountdown = true;
                this.countdownAudio.play();
            } else if (this.remainingTime < 2 && this.playExplosion == false) {
                this.playExplosion = true;
                this.shakeCamera(20);
                this.finalSprite = this.game.add.sprite(this.hero.sprite.x, this.hero.sprite.y, 'finalexplosion');
                this.finalSprite.anchor.setTo(0.5);
                this.finalSprite.scale.setTo(4, 4);
                this.finalSprite.animations.add('explosion');
                this.finalSprite.animations.play('explosion', 20);
                this.timer.add(Phaser.Timer.SECOND * 1, this.openMenu, this);
            }
        }
    }

    shutdown () {
        for (var i = 0; i < this.zombies.length; i++) {
            this.zombies[i].destroy();
        }
        for (var i = 0; i < this.victims.length; i++) {
            this.victims[i].destroy();
        }
        this.hero.destroy();

        this.victims = [];
        this.zombies = []
        this.hero = null;

        if (this.playCountdown) {
            this.countdownAudio.stop();
        }
    }

    getFontStyle (fontSize) {
        return {font: fontSize + "px FeastOfFlesh", fill: "#ff0044", boundsAlignH: "left", boundsAlignV: "top"};
    }

    endTimer () {
        this.timer.stop();
    }

    formatTime (s) {
        const min = Math.floor(s / 60);
        const sec = s - min * 60;
        const minutes = "0" + min;
        const seconds = "0" + sec;

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
        var zombieSpriteKey = 'zombie' + (<string>this.hero.sprite.key).slice(-1);
        var newZombie = new Zombie(this, zombieSpriteKey, {x: this.hero.sprite.x, y: this.hero.sprite.y});
        newZombie.state = newZombie.HUNT;
        this.zombies.push(newZombie);
        this.displayMessage('You\'re now one of us ...', 2000);
        this.hero.destroy();
        this.shakeCamera(20);
        this.timer.add(Phaser.Timer.SECOND * 2, this.openMenu, this);
    }

    openMenu () {
        this.game.state.start('Menu');
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
