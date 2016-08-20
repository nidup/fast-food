var game = new Phaser.Game(1000, 700, Phaser.CANVAS, 'content', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

var map;
var layer;

var cursors;
var hero;
var mushrooms;
var tilesetName = 'Desert';
var tilesetUrl = '/assets/Desert.png';

var shroomName = 'mushrooms';
var shroomUrl = '/assets/Mushroom.png';

var backgroundName = 'Ground';

var zombie1Sprite = '/assets/Zombie2.png';
var zombie2Sprite = '/assets/Zombie2.png';
var heroSprite = '/assets/HatGuy.png';
var frameRate = 5;

var text;
var count = 0;
var zombie;

function preload() {
    game.load.tilemap('map', "tilemap.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.image(tilesetName, tilesetUrl);
    game.load.image(shroomName, shroomUrl);
    game.load.spritesheet('zombie1', zombie1Sprite, 40, 40, 12);
    game.load.spritesheet('zombie2', zombie2Sprite, 40, 40, 12);
    game.load.spritesheet('hero', heroSprite, 40, 40, 12);
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();

    map = game.add.tilemap('map');
    map.addTilesetImage(tilesetName);

    layer = map.createLayer(backgroundName);
    layer.resizeWorld();

    map.setCollision(
        [
            1, 2, 3,
            9, 10, 11,
            17, 18, 19, 20, 21,
            25, 26, 27, 28, 29,
            33, 34, 35, 36, 37,
            41, 42, 43, 44, 45
        ]
    );

    mushrooms = game.add.group();
    mushrooms.enableBody = true;
    mushrooms.physicsBodyType = Phaser.Physics.ARCADE;

    for (i = 0; i < 100; i++) {
        var shroom = mushrooms.create(game.world.randomX, game.world.randomY, shroomName);
        game.physics.arcade.enable(shroom);
    }

    zombie = game.add.sprite(50, 200, 'zombie');
    game.physics.arcade.enable(zombie);
    zombie.body.fixedRotation = true;
    zombie.animations.add('walk-down', [0, 1, 2], frameRate, true);
    zombie.animations.add('walk-right', [3, 4, 5], frameRate, true);
    zombie.animations.add('walk-up', [6, 7, 8], frameRate, true);
    zombie.animations.add('walk-left', [9, 10, 11], frameRate, true);

    hero = game.add.sprite(100, 120, 'hero');
    game.physics.arcade.enable(hero);
    hero.body.fixedRotation = true;

    hero.animations.add('walk-down', [0, 1, 2], frameRate, true);
    hero.animations.add('walk-right', [3, 4, 5], frameRate, true);
    hero.animations.add('walk-up', [6, 7, 8], frameRate, true);
    hero.animations.add('walk-left', [9, 10, 11], frameRate, true);

    hero.body.collideWorldBounds = true;
    hero.body.bounce.set(1);

    game.camera.follow(hero);

    text = game.add.text(game.camera.x,game.camera.y, "Score: 0", {
        font: "24px Arial",
        fill: "#ff0044",
        align: "center"
    });

}

function update() {

    text.x = game.camera.x;
    text.y = game.camera.y;

    game.physics.arcade.collide(hero, zombie, die);
    game.physics.arcade.collide(hero, mushrooms, eat);
    game.physics.arcade.collide(hero, layer);
    game.physics.arcade.collide(zombie, layer);

    move();

    followHero();
}

function render() {
    //game.debug.text('Collide!', 32, 32);
    //layer.debug;
}

function move() {
    hero.body.velocity.x = 0;
    hero.body.velocity.y = 0;

    if (cursors.left.isDown) {
        hero.body.velocity.x = -200;
        hero.animations.play('walk-left');

    } else if (cursors.right.isDown) {
        hero.body.velocity.x = 200;
        hero.animations.play('walk-right');

    } else if (cursors.up.isDown) {
        hero.body.velocity.y = -200;
        hero.animations.play('walk-up');

    } else if (cursors.down.isDown) {
        hero.body.velocity.y = 200;
        hero.animations.play('walk-down');
    }
}

function followHero() {

    var zombieSpeed = 20;
    if (hero.body.y < zombie.body.y) {
        zombie.body.velocity.y = zombieSpeed * -1;
    } else  {
        zombie.body.velocity.y = zombieSpeed;
    }

    if (hero.body.x < zombie.body.x) {
        zombie.body.velocity.x = zombieSpeed * -1;
    } else {
        zombie.body.velocity.x = zombieSpeed;
    }

    var diffY = hero.body.y - zombie.body.y;
    var diffX = hero.body.x - zombie.body.x;

    if (diffY >= diffX) {
        if (hero.body.y <= zombie.body.y) {
            zombie.animations.play('walk-up');
        } else {
            zombie.animations.play('walk-down');
        }
    } else {
        if (hero.body.x <= zombie.body.x) {
            zombie.animations.play('walk-left');
        } else {
            zombie.animations.play('walk-right');
        }
    }
}

function die(player) {
    player.kill();
    var dieText = game.add.text(game.camera.width / 2, game.camera.height / 2, "Score: 0", {
        font: "48px Arial",
        fill: "#ff0044",
        align: "left"
    });
    dieText.fixedToCamera = false;
    dieText.setText("YOU DIED");

}

function updateScore() {
    text.setText("Score:" + count);
}

function eat(player, mushroom) {
    mushroom.kill();
    count++;
    updateScore();
}