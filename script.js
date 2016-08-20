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

var zombieSprite = '/assets/GirlLightExample.png';
var heroSprite = '/assets/HatGuy.png';
var frameRate = 5;

var text;
var count = 0;
var zombie;

var walls;

function preload() {
    //game.load.tilemap('map', "test-desert.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('map', "tilemap-custo.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.image(tilesetName, tilesetUrl);
    game.load.image(shroomName, shroomUrl);
    game.load.spritesheet('zombie', zombieSprite, 40, 40, 12);
    game.load.spritesheet('hero', heroSprite, 40, 40, 12);
}

function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);

    cursors = game.input.keyboard.createCursorKeys();

    map = game.add.tilemap('map');
    map.addTilesetImage(tilesetName);

    var shroomCG = game.physics.p2.createCollisionGroup();
    var playerCG = game.physics.p2.createCollisionGroup();
    var wallsCG =  game.physics.p2.createCollisionGroup();
    var zombieCG = game.physics.p2.createCollisionGroup();

    walls = game.physics.p2.convertCollisionObjects(map, "Collisions", true);

    //console.log(walls);

    for(var wall in walls) {
        walls[wall].setCollisionGroup(wallsCG);
        walls[wall].collides(playerCG);
        walls[wall].collides(zombieCG);
    }

    //map.setCollisionByExclusion([30], true, layer);

    layer = map.createLayer(backgroundName);

    mushrooms = game.add.group();
    mushrooms.enableBody = true;
    mushrooms.physicsBodyType = Phaser.Physics.P2JS;

    for (i = 0; i < 10; i++) {
        var shroom = mushrooms.create(game.world.randomX, game.world.randomY, shroomName);
        shroom.body.setCollisionGroup(shroomCG);
        shroom.body.collides([playerCG, wallsCG]);
    }

    zombie = game.add.sprite(100, 200, 'zombie');
    game.physics.p2.enable(zombie);
    zombie.body.fixedRotation = true;
    zombie.body.setCollisionGroup(zombieCG);
    zombie.body.collides(playerCG);
    zombie.body.collides(wallsCG);
    zombie.animations.add('walk-down', [0, 1, 2], frameRate, true);
    zombie.animations.add('walk-right', [3, 4, 5], frameRate, true);
    zombie.animations.add('walk-up', [6, 7, 8], frameRate, true);
    zombie.animations.add('walk-left', [9, 10, 11], frameRate, true);

    hero = game.add.sprite(250, 120, 'hero');
    game.physics.p2.enable(hero, false);
    hero.body.fixedRotation = true;
    hero.body.setCircle(28);

    hero.animations.add('walk-down', [0, 1, 2], frameRate, true);
    hero.animations.add('walk-right', [3, 4, 5], frameRate, true);
    hero.animations.add('walk-up', [6, 7, 8], frameRate, true);
    hero.animations.add('walk-left', [9, 10, 11], frameRate, true);

    hero.anchor.setTo(0.5, 0.5);
    hero.body.setCollisionGroup(playerCG);
    hero.body.collides(zombieCG, die, this);
    hero.body.collides(wallsCG);
    hero.body.collides(shroomCG, collectCoin, this);

    layer.resizeWorld();

    game.camera.follow(hero);
    //game.physics.p2.createDistanceConstraint(hero, zombie, 150);

    text = game.add.text(game.camera.x,game.camera.y, "Score: 0", {
        font: "24px Arial",
        fill: "#ff0044",
        align: "center"
    });

}

function update() {

    text.x = game.camera.x;
    text.y = game.camera.y;

    move();

    followHero();
}

function render() {
    game.debug.text('Collide!', 32, 32);
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
    player.sprite.kill();
    var dieText = this.game.add.text(game.camera.width / 2, game.camera.height / 2, "Score: 0", {
        font: "48px Arial",
        fill: "#ff0044",
        align: "left"
    });
    dieText.fixedToCamera = false;
    dieText.setText("YOU DIED");

}

function updateText() {
    text.setText("Score:" + count);

}

function collectCoin(player, coin) {
    coin.sprite.kill();
    count++;
    updateText();
}