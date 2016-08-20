var Zombie = function(game, key, position) {
    this.game = game;
    this.key = key;
    this.sprite = this.game.add.sprite(position.x, position.y, this.key);
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.fixedRotation = true;
    this.frameRate = 5;
    this.sprite.animations.add('walk-down', [0, 1, 2], this.frameRate, true);
    this.sprite.animations.add('walk-right', [3, 4, 5], this.frameRate, true);
    this.sprite.animations.add('walk-up', [6, 7, 8], this.frameRate, true);
    this.sprite.animations.add('walk-left', [9, 10, 11], this.frameRate, true);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.set(1);
};

Zombie.prototype.follow = function(hero) {
    var zombieSpeed = 20;
    if (hero.sprite.body.y < this.sprite.body.y) {
        this.sprite.body.velocity.y = zombieSpeed * -1;
    } else  {
        this.sprite.body.velocity.y = zombieSpeed;
    }

    if (hero.sprite.body.x < this.sprite.body.x) {
        this.sprite.body.velocity.x = zombieSpeed * -1;
    } else {
        this.sprite.body.velocity.x = zombieSpeed;
    }

    var diffY = hero.sprite.body.y - this.sprite.body.y;
    var diffX = hero.sprite.body.x - this.sprite.body.x;

    if (diffY >= diffX) {
        if (hero.sprite.body.y <= this.sprite.body.y) {
            this.sprite.animations.play('walk-up');
        } else {
            this.sprite.animations.play('walk-down');
        }
    } else {
        if (hero.sprite.body.x <= this.sprite.body.x) {
            this.sprite.animations.play('walk-left');
        } else {
            this.sprite.animations.play('walk-right');
        }
    }
};

Zombie.prototype.update = function() {
    this.game.physics.arcade.collide(this.sprite, this.game.layer);
};
