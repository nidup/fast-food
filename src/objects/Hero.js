class Hero {

    constructor (game, key, position) {
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
    }

    move (cursors) {
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
    }

    update (zombies, victims) {
        this.game.physics.arcade.collide(this.sprite, this.game.layer);

        var zombieSprites = [];
        for (var i=0; i<zombies.length; i++) {
            zombieSprites.push(zombies[i].sprite);
        }
        this.game.physics.arcade.collide(this.sprite, zombieSprites, this.eaten, null, this);

        var victimSprites = [];
        for (var i=0; i<victims.length; i++) {
            victimSprites.push(victims[i].sprite);
        }
        this.game.physics.arcade.collide(this.sprite, victimSprites);
    }

    destroy () {
        this.sprite.destroy();
    }

    eaten (victim) {
        this.state = this.EATEN;
        if (this.isDead == false) {
            var dieSprite = this.game.add.sprite(this.sprite.x - this.sprite.width, this.sprite.y - this.sprite.height, 'explode');
            dieSprite.animations.add('eaten');
            dieSprite.animations.play('eaten', 20, false, true);
            var explodeAudio = this.game.add.audio('explosion');
            explodeAudio.play();
            //dieSprite.animations.currentAnim.onComplete.add(function () {	console.log('animation complete');}, this);
            this.isDead = true;
        }
    }
}

export default Hero;