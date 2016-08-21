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
    this.sprite.body.mass = 10;

    this.YELL = 'yell';
    this.EATEN = 'eaten';
    this.FOLLOW = 'follow';
    this.state = this.YELL;
    this.isDead = false;
    this.yellTimer = 0;
    var style = { font: "bold 18px Arial", fill: "#ff0044", boundsAlignH: "center", boundsAlignV: "middle" };
    this.yellText = this.game.add.text(this.sprite.x, this.sprite.y - 20, 'Help!', style);
    this.astarTimer = 0;
    this.speed = 30;
    this.visibilityScope = 300;
};

Victim.prototype.move = function(hero) {

    var diffY = Math.abs(hero.sprite.body.y - this.sprite.body.y);
    var diffX = Math.abs(hero.sprite.body.x - this.sprite.body.x);

    if (diffX < this.visibilityScope && diffY < this.visibilityScope) {
        this.state = this.FOLLOW;
    }
    if (this.state == this.FOLLOW) {
        this.findNextDirection(hero);
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

Victim.prototype.findNextDirection = function (target) {

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
