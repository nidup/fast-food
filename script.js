var game = new Phaser.Game(1000, 600, Phaser.CANVAS, 'content');

var FastFoodGame = function (game) {
    this.game = game;
    this.map = null;
    this.layer = null;

    this.hero = null;
    this.zombies = [];
    this.mushrooms = [];

    this.cursors = null;
    this.frameRate = 5;
    this.scoreText = null;

    this.wallIndexes = [
        1, 2, 3,
        9, 10, 11,
        17, 18, 19, 20, 21,
        25, 26, 27, 28, 29,
        33, 34, 35, 36, 37,
        41, 42, 43, 44, 45
    ];
};

FastFoodGame.prototype = {

    preload : function () {
        this.load.tilemap('map', "tilemap.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image('Desert', '/assets/Desert.png');
        this.load.image('mushrooms', '/assets/Mushroom.png');
        this.load.spritesheet('zombie1', '/assets/Zombie1.png', 40, 40, 12);
        this.load.spritesheet('zombie2', '/assets/Zombie2.png', 40, 40, 12);
        this.load.spritesheet('zombie3', '/assets/Zombie3.png', 40, 40, 12);
        this.load.spritesheet('zombie4', '/assets/Zombie4.png', 40, 40, 12);
        this.load.spritesheet('zombie5', '/assets/Zombie5.png', 40, 40, 12);
        this.load.spritesheet('zombie6', '/assets/Zombie6.png', 40, 40, 12);
        this.load.spritesheet('hero', '/assets/HatGuy.png', 40, 40, 12);
    },

    create : function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('Desert');
        this.layer = this.map.createLayer('Ground');
        this.layer.resizeWorld();

        this.map.setCollision(this.wallIndexes);

        this.mushrooms = this.add.group();
        this.mushrooms.enableBody = true;
        this.mushrooms.physicsBodyType = Phaser.Physics.ARCADE;

        for (i = 0; i < 100; i++) {
            var randomX = this.world.randomX;
            var randomY = this.world.randomY;
            var shroom = this.mushrooms.create(randomX, randomY, 'mushrooms');
            this.physics.arcade.enable(shroom);
        }

        this.zombies.push(
            new Zombie(this, 'zombie1', {x: 620, y: 120}),
            new Zombie(this, 'zombie4', {x: 50, y: 300}),
            new Zombie(this, 'zombie2', {x: 50, y: 10}),
            new Zombie(this, 'zombie5', {x: 300, y: 400}),
            new Zombie(this, 'zombie3', {x: 400, y: 800}),
            new Zombie(this, 'zombie6', {x: 200, y: 550})
        );

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

        this.hero.update(this.zombies, this.mushrooms);
        this.hero.move(this.cursors);

        for (var i=0; i<this.zombies.length; i++) {
            this.zombies[i].update(this.zombies);
            this.zombies[i].move(this.hero);
        }

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
