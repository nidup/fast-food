var game = new Phaser.Game(1000, 700, Phaser.CANVAS, 'content');

var FastFoodGame = function (game) {
    this.game = game;
    this.map = null;
    this.layer = null;

    this.hero = null;
    this.mushrooms = [];
    this.zombie;

    this.cursors = null;
    this.frameRate = 5;
    this.scoreText = null;
};

FastFoodGame.prototype = {

    preload : function () {
        this.load.tilemap('map', "tilemap.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image('Desert', '/assets/Desert.png');
        this.load.image('mushrooms', '/assets/Mushroom.png');
        this.load.spritesheet('zombie1', '/assets/Zombie1.png', 40, 40, 12);
        this.load.spritesheet('zombie2', '/assets/Zombie2.png', 40, 40, 12);
        this.load.spritesheet('hero', '/assets/HatGuy.png', 40, 40, 12);
    },

    create : function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('Desert');
        this.layer = this.map.createLayer('Ground');
        this.layer.resizeWorld();

        this.map.setCollision(
            [
                1, 2, 3,
                9, 10, 11,
                17, 18, 19, 20, 21,
                25, 26, 27, 28, 29,
                33, 34, 35, 36, 37,
                41, 42, 43, 44, 45
            ]
        );

        this.mushrooms = this.add.group();
        this.mushrooms.enableBody = true;
        this.mushrooms.physicsBodyType = Phaser.Physics.ARCADE;

        for (i = 0; i < 100; i++) {
            var shroom = this.mushrooms.create(this.world.randomX, this.world.randomY, 'mushrooms');
            this.physics.arcade.enable(shroom);
        }

        this.zombie = this.add.sprite(50, 200, 'zombie1');
        this.physics.arcade.enable(this.zombie);
        this.zombie.body.fixedRotation = true;
        this.zombie.animations.add('walk-down', [0, 1, 2], this.frameRate, true);
        this.zombie.animations.add('walk-right', [3, 4, 5], this.frameRate, true);
        this.zombie.animations.add('walk-up', [6, 7, 8], this.frameRate, true);
        this.zombie.animations.add('walk-left', [9, 10, 11], this.frameRate, true);
        this.hero = new Hero(this, 'hero', {x: 100, y: 120});
        this.camera.follow(this.hero.sprite);

        this.scoreText = this.add.text(this.camera.x, this.camera.y, "Score: 0", {
            font: "24px Arial",
            fill: "#ff0044",
            align: "center"
        });

    },

    update : function() {

        this.scoreText.x = this.camera.x;
        this.scoreText.y = this.camera.y;
        this.scoreText.setText('Score:' + this.hero.countMushrooms);

        this.hero.update(this.zombie, this.mushrooms);
        this.hero.move(this.cursors);

        this.physics.arcade.collide(this.zombie, this.layer);

        this.followHero();

        if (this.hero.isDead) {
            var dieText = this.add.text(this.camera.width / 2, this.camera.height / 2, "Score: 0", {
                font: "48px Arial",
                fill: "#ff0044",
                align: "left"
            });
            dieText.fixedToCamera = false;
            dieText.setText("YOU DIED");
        }
    },

    render : function () {
        //layer.debug;
    },

    followHero : function () {

        var zombieSpeed = 20;
        if (this.hero.sprite.body.y < this.zombie.body.y) {
            this.zombie.body.velocity.y = zombieSpeed * -1;
        } else  {
            this.zombie.body.velocity.y = zombieSpeed;
        }

        if (this.hero.sprite.body.x < this.zombie.body.x) {
            this.zombie.body.velocity.x = zombieSpeed * -1;
        } else {
            this.zombie.body.velocity.x = zombieSpeed;
        }

        var diffY = this.hero.sprite.body.y - this.zombie.body.y;
        var diffX = this.hero.sprite.body.x - this.zombie.body.x;

        if (diffY >= diffX) {
            if (this.hero.sprite.body.y <= this.zombie.body.y) {
                this.zombie.animations.play('walk-up');
            } else {
                this.zombie.animations.play('walk-down');
            }
        } else {
            if (this.hero.sprite.body.x <= this.zombie.body.x) {
                this.zombie.animations.play('walk-left');
            } else {
                this.zombie.animations.play('walk-right');
            }
        }
    }
};

game.state.add('Game', FastFoodGame, true);
