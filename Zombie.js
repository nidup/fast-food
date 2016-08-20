var Zombie = function(game, key, position) {
    this.game = game;
    this.key = key;
    this.sprite = this.game.add.sprite(position.x, position.y, this.key);
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.fixedRotation = true;
    this.frameRate = 5;
    this.sprite.animations.add('waiting', [1], this.frameRate, true);
    this.sprite.animations.add('walk-down', [0, 1, 2], this.frameRate, true);
    this.sprite.animations.add('walk-right', [3, 4, 5], this.frameRate, true);
    this.sprite.animations.add('walk-up', [6, 7, 8], this.frameRate, true);
    this.sprite.animations.add('walk-left', [9, 10, 11], this.frameRate, true);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.set(1);
    this.WAITING = 'waiting';
    this.HUNTING = 'hunting';
    this.state = this.WAITING;
};

Zombie.prototype.move = function(hero) {

    var scope = 200;
    var diffY = Math.abs(hero.sprite.body.y - this.sprite.body.y);
    var diffX = Math.abs(hero.sprite.body.x - this.sprite.body.x);

    if ((diffX > scope || diffY > scope) && this.state != this.HUNTING) {
        this.state = this.WAITING;
        this.sprite.animations.play('waiting');
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;

    } else {
        this.state = this.HUNTING;

        var zombieSpeed = 20;
        if (hero.sprite.body.y < this.sprite.body.y) {
            this.sprite.body.velocity.y = zombieSpeed * -1;
        } else {
            this.sprite.body.velocity.y = zombieSpeed;
        }

        if (hero.sprite.body.x < this.sprite.body.x) {
            this.sprite.body.velocity.x = zombieSpeed * -1;
        } else {
            this.sprite.body.velocity.x = zombieSpeed;
        }

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
