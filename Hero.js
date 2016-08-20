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

Hero.prototype.update = function(zombie, mushrooms) {
    this.game.physics.arcade.collide(this.sprite, zombie, this.die, null, this);
    this.game.physics.arcade.collide(this.sprite, mushrooms, this.eat, null, this);
    this.game.physics.arcade.collide(this.sprite, this.game.layer);
};

Hero.prototype.checkKeys = function(cursors) {


};


Hero.prototype.die = function (player) {
    player.kill();
    this.isDead = true;
};

Hero.prototype.eat = function (player, mushroom) {
    mushroom.kill();
    this.countMushrooms++;
};


/*
Pacman.prototype.eatDot = function(pacman, dot) {
    dot.kill();

    this.game.score ++;
    this.game.numDots --;

    if (this.game.dots.total === 0)
    {
        this.game.dots.callAll('revive');
    }
};

Pacman.prototype.eatPill = function(pacman, pill) {
    pill.kill();

    this.game.score ++;
    this.game.numPills --;

    this.game.enterFrightenedMode();
};

Pacman.prototype.turn = function () {
    var cx = Math.floor(this.sprite.x);
    var cy = Math.floor(this.sprite.y);

    //  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
    if (!this.game.math.fuzzyEqual(cx, this.turnPoint.x, this.threshold) || !this.game.math.fuzzyEqual(cy, this.turnPoint.y, this.threshold))
    {
        return false;
    }

    //  Grid align before turning
    this.sprite.x = this.turnPoint.x;
    this.sprite.y = this.turnPoint.y;

    this.sprite.body.reset(this.turnPoint.x, this.turnPoint.y);
    this.move(this.turning);
    this.turning = Phaser.NONE;

    return true;
};

Pacman.prototype.checkDirection = function (turnTo) {
    if (this.turning === turnTo || this.directions[turnTo] === null || this.directions[turnTo].index !== this.safetile)
    {
        //  Invalid direction if they're already set to turn that way
        //  Or there is no tile there, or the tile isn't index 1 (a floor tile)
        return;
    }

    //  Check if they want to turn around and can
    if (this.current === this.opposites[turnTo])
    {
        this.move(turnTo);
        this.keyPressTimer = this.game.time.time;
    }
    else
    {
        this.turning = turnTo;

        this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2);
        this.turnPoint.y = (this.marker.y * this.gridsize) + (this.gridsize / 2);
        this.want2go = Phaser.NONE;
    }
};

Pacman.prototype.getPosition = function () {
    return new Phaser.Point((this.marker.x * this.gridsize) + (this.gridsize / 2), (this.marker.y * this.gridsize) + (this.gridsize / 2));
};

Pacman.prototype.getCurrentDirection = function() {
    return this.current;
};*/