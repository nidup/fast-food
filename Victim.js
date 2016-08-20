var Victim = function(game, key, position) {
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
    this.YELL = 'yell';
    this.FOLLOW = 'follow';
    this.state = this.WAIT;
    this.isDead = false;
};

Victim.prototype.move = function(hero) {

    var scope = 200;
    var diffY = Math.abs(hero.sprite.body.y - this.sprite.body.y);
    var diffX = Math.abs(hero.sprite.body.x - this.sprite.body.x);

    if (diffX < scope && diffY < scope) {
        this.state = this.FOLLOW;
    }
    if (this.state == this.FOLLOW) {
        var speed = 30;
        if (hero.sprite.body.y < this.sprite.body.y) {
            this.sprite.body.velocity.y = speed * -1;
        } else {
            this.sprite.body.velocity.y = speed;
        }

        if (hero.sprite.body.x < this.sprite.body.x) {
            this.sprite.body.velocity.x = speed * -1;
        } else {
            this.sprite.body.velocity.x = speed;
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

Victim.prototype.update = function(zombies) {
    this.game.physics.arcade.collide(this.sprite, this.game.layer);
    var zombieSprites = [];
    for (var i=0; i<zombies.length; i++) {
        zombieSprites.push(zombies[i].sprite);
    }
    this.game.physics.arcade.collide(this.sprite, zombieSprites, this.die, null, this);


    /*
    if (this.state == this.WAIT) {
        var yellText = this.game.add.text(this.sprite.x, this.sprite.y - 20, 'Help !', {
            font: "12px Arial",
            fill: "#ff0044",
            align: "center"
        });

        yellText.fixedToCamera = false;
        if (Math.ceil(this.game.time.elapsed / 1000) % 2 == 0) {
            yellText.visible = !yellText.visible;
        } else {
            yellText.visible = !yellText.visible;
        }
    }*/
};

Victim.prototype.die = function (victim) {
    this.isDead = true;
};
