var Hero = function(game, key, position) {
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
    this.isDead = false;
    this.countMushrooms = 0;
};

Hero.prototype.move = function(cursors) {
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;

    if (cursors.left.isDown) {
        this.sprite.body.velocity.x = -200;
        this.sprite.animations.play('walk-left');

    } else if (cursors.right.isDown) {
        this.sprite.body.velocity.x = 200;
        this.sprite.animations.play('walk-right');

    } else if (cursors.up.isDown) {
        this.sprite.body.velocity.y = -200;
        this.sprite.animations.play('walk-up');

    } else if (cursors.down.isDown) {
        this.sprite.body.velocity.y = 200;
        this.sprite.animations.play('walk-down');
    }
};

Hero.prototype.update = function(zombies, victims, mushrooms) {
    this.game.physics.arcade.collide(this.sprite, mushrooms, this.eat, null, this);
    this.game.physics.arcade.collide(this.sprite, this.game.layer);

    var zombieSprites = [];
    for (var i=0; i<zombies.length; i++) {
        zombieSprites.push(zombies[i].sprite);
    }
    this.game.physics.arcade.collide(this.sprite, zombieSprites, this.die, null, this);

    var victimSprites = [];
    for (var i=0; i<victims.length; i++) {
        victimSprites.push(victims[i].sprite);
    }
    this.game.physics.arcade.collide(this.sprite, victimSprites);
};

Hero.prototype.die = function (player) {
    player.kill();
    this.isDead = true;
};

Hero.prototype.eat = function (player, mushroom) {
    mushroom.kill();
    this.countMushrooms++;
};
