var Zombie = function(game, key, position) {
    this.game = game;
    this.key = key;
    this.sprite = this.game.add.sprite(position.x, position.y, this.key);
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.fixedRotation = true;
    this.frameRate = 5;
    this.sprite.animations.add('wait', [1], this.frameRate, true);
    this.sprite.animations.add('walk-down', [0, 1, 2], this.frameRate, true);
    this.sprite.animations.add('walk-right', [3, 4, 5], this.frameRate, true);
    this.sprite.animations.add('walk-up', [6, 7, 8], this.frameRate, true);
    this.sprite.animations.add('walk-left', [9, 10, 11], this.frameRate, true);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.set(1);
    this.WAIT = 'wait';
    this.HUNT = 'hunt';
    this.state = this.WAIT;
    this.target = null;
    this.visibilityScope = 300;
    this.astarTimer = 0;
    this.speed = 20;
};

Zombie.prototype.move = function(hero, victims) {

    var diffY = Math.abs(hero.sprite.body.y - this.sprite.body.y);
    var diffX = Math.abs(hero.sprite.body.x - this.sprite.body.x);

    if ((diffX > this.visibilityScope || diffY > this.visibilityScope) && this.state != this.HUNT) {
        this.state = this.WAIT;
        this.sprite.animations.play('wait');
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;

    } else {
        this.state = this.HUNT;

        this.chooseTarget(hero, victims);
        this.findNextDirection(this.target);
    }
};

Zombie.prototype.chooseTarget = function (hero, victims) {
    this.target = hero;
    var diffY = Math.abs(hero.sprite.body.y - this.sprite.body.y);
    var diffX = Math.abs(hero.sprite.body.x - this.sprite.body.x);
    for (var i = 0; i < victims.length; i++) {
        var victim = victims[i];
        var newDiffY = Math.abs(victim.sprite.body.y - this.sprite.body.y);
        var newDiffX = Math.abs(victim.sprite.body.x - this.sprite.body.x);
        if (newDiffY < diffY && newDiffX < diffX) {
            this.target = victim;
            diffX = newDiffX;
            diffY = newDiffY;
        }
    }
};

Zombie.prototype.update = function(zombies) {
    this.game.physics.arcade.collide(this.sprite, this.game.layer);
    var zombieSprites = [];
    for (var i=0; i<zombies.length; i++) {
        zombieSprites.push(zombies[i].sprite);
    }
    this.game.physics.arcade.collide(this.sprite, zombieSprites);
};

Zombie.prototype.findNextDirection = function (target) {

    this.astarTimer += this.game.time.elapsed;
    var astarTiming = 2000;
    if (this.astarTimer >= astarTiming ) {
        this.astarTimer -= astarTiming;
        var myTile = this.game.map.getTileWorldXY(this.sprite.x, this.sprite.y);
        var targetTile = this.game.map.getTileWorldXY(target.sprite.x, target.sprite.y);
        var mysprite = this.sprite;
        var myspeed = this.speed;
        this.game.easystar.findPath(myTile.x, myTile.y, targetTile.x, targetTile.y, function (path) {
            if (path === null) {
                console.log("The path to the destination point was not found.");
            } else {

                if (path[1].y < myTile.y) {
                    mysprite.body.velocity.y = myspeed * -1;
                    mysprite.animations.play('walk-up');
                } else {
                    mysprite.body.velocity.y = myspeed;
                    mysprite.animations.play('walk-down');
                }

                if (path[1].x < myTile.x) {
                    mysprite.body.velocity.x = myspeed * -1;
                    mysprite.animations.play('walk-left');
                } else {
                    mysprite.body.velocity.x = myspeed;
                    mysprite.animations.play('walk-right');
                }
            }
        });
        this.game.easystar.calculate();
    }
};
