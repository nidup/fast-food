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
    this.EATEN = 'eaten';
    this.FOLLOW = 'follow';
    this.state = this.YELL;
    this.isDead = false;
    this.yellTimer = 0;
    var style = { font: "bold 18px Arial", fill: "#ff0044", boundsAlignH: "center", boundsAlignV: "middle" };
    this.yellText = this.game.add.text(this.sprite.x, this.sprite.y - 20, 'Help!', style);
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

Victim.prototype.update = function(zombies, victims) {
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

    if (this.state == this.YELL) {
        this.yellTimer += this.game.time.elapsed;
        var blinkTiming = 2000;
        if (this.yellTimer >= blinkTiming ) {
            this.yellTimer -= blinkTiming;
            var verticalTween = this.game.add.tween(this.yellText).to({y: this.sprite.y - 40}, 700, Phaser.Easing.Linear.None, true);
            verticalTween.onComplete.add(function () { this.yellText.y = this.sprite.y - 20}, this);
            var fadingTween = this.game.add.tween(this.yellText).to({alpha: 0}, 700, Phaser.Easing.Linear.None, true);
            fadingTween.onComplete.add(function () { this.yellText.alpha = 1}, this);
        }
    } else {
        this.yellText.visible = false;
    }
};

Victim.prototype.eaten = function (victim) {
    this.state = this.EATEN;
    if (this.isDead == false) {
        var dieSprite = this.game.add.sprite(this.sprite.x, this.sprite.y, 'explode');
        dieSprite.animations.add('eaten');
        dieSprite.animations.play('eaten', 20, false, true);
        //dieSprite.animations.currentAnim.onComplete.add(function () {	console.log('animation complete');}, this);
        this.isDead = true;
    }
};
