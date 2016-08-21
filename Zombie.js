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
        this.hunt();
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

Zombie.prototype.hunt = function () {
    var diffY = Math.abs(this.target.sprite.body.y - this.sprite.body.y);
    var diffX = Math.abs(this.target.sprite.body.x - this.sprite.body.x);
    var zombieSpeed = 20;

    if (this.target.sprite.body.y < this.sprite.body.y) {
        this.sprite.body.velocity.y = zombieSpeed * -1;
    } else {
        this.sprite.body.velocity.y = zombieSpeed;
    }

    if (this.target.sprite.body.x < this.sprite.body.x) {
        this.sprite.body.velocity.x = zombieSpeed * -1;
    } else {
        this.sprite.body.velocity.x = zombieSpeed;
    }

    if (diffY >= diffX) {
        if (this.target.sprite.body.y <= this.sprite.body.y) {
            this.sprite.animations.play('walk-up');
        } else {
            this.sprite.animations.play('walk-down');
        }
    } else {
        if (this.target.sprite.body.x <= this.sprite.body.x) {
            this.sprite.animations.play('walk-left');
        } else {
            this.sprite.animations.play('walk-right');
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
