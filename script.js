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

        this.zombie = new Zombie(this, 'zombie1', {x: 50, y: 200})

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

        this.hero.update(this.zombie.sprite, this.mushrooms);
        this.hero.move(this.cursors);

        this.zombie.update();
        this.zombie.follow(this.hero);

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
    }
};

game.state.add('Game', FastFoodGame, true);
