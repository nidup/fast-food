(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _Boot = require('states/Boot');

var _Boot2 = _interopRequireDefault(_Boot);

var _Preload = require('states/Preload');

var _Preload2 = _interopRequireDefault(_Preload);

var _Menu = require('states/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Play = require('states/Play');

var _Play2 = _interopRequireDefault(_Play);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Game = function (_Phaser$Game) {
    _inherits(Game, _Phaser$Game);

    function Game() {
        _classCallCheck(this, Game);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Game).call(this, 1000, 600, Phaser.CANVAS, 'content'));

        _this.state.add('Boot', _Boot2.default);
        _this.state.add('Preload', _Preload2.default);
        _this.state.add('Menu', _Menu2.default);
        _this.state.add('Play', _Play2.default);
        _this.state.start('Boot');
        return _this;
    }

    return Game;
}(Phaser.Game);

new Game();

},{"states/Boot":6,"states/Menu":7,"states/Play":8,"states/Preload":9}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var AbstractCharacter = function () {
    function AbstractCharacter() {
        _classCallCheck(this, AbstractCharacter);
    }

    _createClass(AbstractCharacter, [{
        key: "play",
        value: function play() {
            throw new TypeError("Do not call abstract method foo from child.");
        }
    }]);

    return AbstractCharacter;
}();

exports.default = AbstractCharacter;

},{}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _AbstractCharacter2 = require('objects/AbstractCharacter');

var _AbstractCharacter3 = _interopRequireDefault(_AbstractCharacter2);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Hero = function (_AbstractCharacter) {
    _inherits(Hero, _AbstractCharacter);

    function Hero(game, key, position) {
        _classCallCheck(this, Hero);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Hero).call(this));

        _this.game = game;
        _this.key = key;
        _this.sprite = _this.game.add.sprite(position.x, position.y, _this.key);
        _this.game.physics.arcade.enable(_this.sprite);
        _this.sprite.body.fixedRotation = true;
        _this.frameRate = 5;
        _this.sprite.animations.add('walk-down', [0, 1, 2], _this.frameRate, true);
        _this.sprite.animations.add('walk-right', [3, 4, 5], _this.frameRate, true);
        _this.sprite.animations.add('walk-up', [6, 7, 8], _this.frameRate, true);
        _this.sprite.animations.add('walk-left', [9, 10, 11], _this.frameRate, true);
        _this.sprite.body.collideWorldBounds = true;
        _this.sprite.body.bounce.set(1);
        _this.isDead = false;
        _this.isSafe = false;
        return _this;
    }

    _createClass(Hero, [{
        key: 'play',
        value: function play() {
            this.move(this.game.cursors);
            this.update(this.game.zombies, this.game.victims);
        }
    }, {
        key: 'move',
        value: function move(cursors) {
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

            if (this.game.exitX <= this.sprite.x) {
                this.isSafe = true;
                this.stop();
            }
        }
    }, {
        key: 'update',
        value: function update(zombies, victims) {
            this.game.physics.arcade.collide(this.sprite, this.game.layer);

            var zombieSprites = [];
            for (var i = 0; i < zombies.length; i++) {
                zombieSprites.push(zombies[i].sprite);
            }
            this.game.physics.arcade.collide(this.sprite, zombieSprites, this.eaten, null, this);

            var victimSprites = [];
            for (var i = 0; i < victims.length; i++) {
                victimSprites.push(victims[i].sprite);
            }
            this.game.physics.arcade.collide(this.sprite, victimSprites);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.sprite.destroy();
        }
    }, {
        key: 'eaten',
        value: function eaten(victim) {
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
    }, {
        key: 'stop',
        value: function stop() {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        }
    }]);

    return Hero;
}(_AbstractCharacter3.default);

exports.default = Hero;

},{"objects/AbstractCharacter":2}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _AbstractCharacter2 = require('objects/AbstractCharacter');

var _AbstractCharacter3 = _interopRequireDefault(_AbstractCharacter2);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Victim = function (_AbstractCharacter) {
    _inherits(Victim, _AbstractCharacter);

    function Victim(game, key, position) {
        _classCallCheck(this, Victim);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Victim).call(this));

        _this.game = game;
        _this.key = key;

        _this.sprite = _this.game.add.sprite(position.x, position.y, _this.key);
        _this.game.physics.arcade.enable(_this.sprite);
        _this.sprite.body.fixedRotation = true;
        _this.frameRate = 5;
        _this.sprite.animations.add('waiting', [1], _this.frameRate, true);
        _this.sprite.animations.add('walk-down', [0, 1, 2], _this.frameRate, true);
        _this.sprite.animations.add('walk-right', [3, 4, 5], _this.frameRate, true);
        _this.sprite.animations.add('walk-up', [6, 7, 8], _this.frameRate, true);
        _this.sprite.animations.add('walk-left', [9, 10, 11], _this.frameRate, true);
        _this.sprite.body.collideWorldBounds = true;
        _this.sprite.body.bounce.set(1);
        _this.sprite.body.mass = 10;

        _this.YELL = 'yell';
        _this.EATEN = 'eaten';
        _this.FOLLOW = 'follow';
        _this.state = _this.YELL;
        _this.isDead = false;
        _this.speed = 50;
        _this.visibilityScope = 300;

        _this.speakTimer = 0;
        var style = { font: "bold 18px FeastOfFlesh", fill: "#ff0044", boundsAlignH: "center", boundsAlignV: "middle" };
        _this.speakText = _this.game.add.text(_this.sprite.x, _this.sprite.y - 20, 'Help!', style);
        _this.speakText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);

        _this.astarTimer = 0;
        return _this;
    }

    _createClass(Victim, [{
        key: 'play',
        value: function play() {
            this.move(this.game.hero);
            this.update(this.game.zombies, this.game.victims);
        }
    }, {
        key: 'move',
        value: function move(hero) {

            var diffY = Math.abs(hero.sprite.body.y - this.sprite.body.y);
            var diffX = Math.abs(hero.sprite.body.x - this.sprite.body.x);

            if (diffX < this.visibilityScope && diffY < this.visibilityScope) {
                this.state = this.FOLLOW;
            } else if (diffX > 1000) {
                this.state = this.YELL;
                this.sprite.animations.play('waiting');
                this.sprite.body.velocity.x = 0;
                this.sprite.body.velocity.y = 0;
            }

            if (this.state == this.FOLLOW) {
                this.findNextDirection(hero);
            }
        }
    }, {
        key: 'update',
        value: function update(zombies, victims) {
            this.game.physics.arcade.collide(this.sprite, this.game.layer);
            var zombieSprites = [];
            for (var i = 0; i < zombies.length; i++) {
                zombieSprites.push(zombies[i].sprite);
            }
            this.game.physics.arcade.collide(this.sprite, zombieSprites, this.eaten, null, this);

            var victimSprites = [];
            for (var i = 0; i < victims.length; i++) {
                victimSprites.push(victims[i].sprite);
            }
            this.game.physics.arcade.collide(this.sprite, victimSprites);

            if (this.state == this.YELL) {
                this.speakText.setText('Help!');
            } else if (this.state == this.FOLLOW) {
                this.speakText.setText('Follow!');
            } else if (this.state == this.EATEN) {
                this.speakText.setText('Argghh!');
            }

            this.speakTimer += this.game.time.elapsed;
            var blinkTiming = 2000;
            if (this.speakTimer >= blinkTiming) {
                this.speakTimer -= blinkTiming;
                var verticalTween = this.game.add.tween(this.speakText).to({ y: this.sprite.y - 40 }, 700, Phaser.Easing.Linear.None, true);
                verticalTween.onComplete.add(function () {
                    this.speakText.y = this.sprite.y - 20;
                }, this);
                var fadingTween = this.game.add.tween(this.speakText).to({ alpha: 0 }, 700, Phaser.Easing.Linear.None, true);
                fadingTween.onComplete.add(function () {
                    this.speakText.alpha = 1;
                }, this);
            } else {
                this.speakText.x = this.sprite.x;
                this.speakText.y = this.sprite.y - 20;
            }
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.sprite.destroy();
            this.speakText.destroy();
        }
    }, {
        key: 'eaten',
        value: function eaten(victim) {
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
    }, {
        key: 'findNextDirection',
        value: function findNextDirection(target) {

            this.astarTimer += this.game.time.elapsed;
            var astarTiming = 1000;
            if (this.astarTimer >= astarTiming) {
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
                        } else {
                            mysprite.body.velocity.y = myspeed;
                        }

                        if (path[1].x < myTile.x) {
                            mysprite.body.velocity.x = myspeed * -1;
                        } else {
                            mysprite.body.velocity.x = myspeed;
                        }

                        var diffY = Math.abs(path[1].y - targetTile.y);
                        var diffX = Math.abs(path[1].x - targetTile.x);
                        if (diffY >= diffX) {
                            if (path[1].y < myTile.y) {
                                mysprite.animations.play('walk-up');
                            } else {
                                mysprite.animations.play('walk-down');
                            }
                        } else {
                            if (path[1].x < myTile.x) {
                                mysprite.animations.play('walk-left');
                            } else {
                                mysprite.animations.play('walk-right');
                            }
                        }
                    }
                });
                this.game.easystar.calculate();
            }
        }
    }]);

    return Victim;
}(_AbstractCharacter3.default);

exports.default = Victim;

},{"objects/AbstractCharacter":2}],5:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _AbstractCharacter2 = require('objects/AbstractCharacter');

var _AbstractCharacter3 = _interopRequireDefault(_AbstractCharacter2);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Zombie = function (_AbstractCharacter) {
    _inherits(Zombie, _AbstractCharacter);

    function Zombie(game, key, position) {
        _classCallCheck(this, Zombie);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Zombie).call(this));

        _this.game = game;
        _this.key = key;
        _this.sprite = _this.game.add.sprite(position.x, position.y, _this.key);
        _this.game.physics.arcade.enable(_this.sprite);
        _this.sprite.body.fixedRotation = true;
        _this.frameRate = 5;
        _this.sprite.animations.add('wait', [1], _this.frameRate, true);
        _this.sprite.animations.add('walk-down', [0, 1, 2], _this.frameRate, true);
        _this.sprite.animations.add('walk-right', [3, 4, 5], _this.frameRate, true);
        _this.sprite.animations.add('walk-up', [6, 7, 8], _this.frameRate, true);
        _this.sprite.animations.add('walk-left', [9, 10, 11], _this.frameRate, true);
        _this.sprite.body.collideWorldBounds = true;
        _this.sprite.body.bounce.set(1);
        _this.sprite.body.mass = 10;
        _this.WAIT = 'wait';
        _this.HUNT = 'hunt';
        _this.state = _this.WAIT;
        _this.target = null;
        _this.visibilityScope = 300;
        _this.astarTimer = 0;
        _this.speed = 20;
        return _this;
    }

    _createClass(Zombie, [{
        key: 'play',
        value: function play() {
            this.move(this.game.hero, this.game.victims);
            this.update(this.game.zombies);
        }
    }, {
        key: 'move',
        value: function move(hero, victims) {
            var diffY = Math.abs(hero.sprite.body.y - this.sprite.body.y);
            var diffX = Math.abs(hero.sprite.body.x - this.sprite.body.x);

            if ((diffX > this.visibilityScope || diffY > this.visibilityScope) && this.state != this.HUNT) {
                this.state = this.WAIT;
                this.sprite.animations.play('wait');
                this.sprite.body.velocity.x = 0;
                this.sprite.body.velocity.y = 0;
            } else if (diffX > 1000) {
                this.state = this.WAIT;
                this.sprite.animations.play('wait');
                this.sprite.body.velocity.x = 0;
                this.sprite.body.velocity.y = 0;
            } else {
                this.state = this.HUNT;

                this.chooseTarget(hero, victims);
                this.findNextDirection(this.target);
            }
        }
    }, {
        key: 'chooseTarget',
        value: function chooseTarget(hero, victims) {
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
        }
    }, {
        key: 'update',
        value: function update(zombies) {
            this.game.physics.arcade.collide(this.sprite, this.game.layer);
            var zombieSprites = [];
            for (var i = 0; i < zombies.length; i++) {
                zombieSprites.push(zombies[i].sprite);
            }
            this.game.physics.arcade.collide(this.sprite, zombieSprites);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.sprite.destroy();
        }
    }, {
        key: 'findNextDirection',
        value: function findNextDirection(target) {

            this.astarTimer += this.game.time.elapsed;
            var astarTiming = 1000;
            if (this.astarTimer >= astarTiming) {
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
                        } else {
                            mysprite.body.velocity.y = myspeed;
                        }

                        if (path[1].x < myTile.x) {
                            mysprite.body.velocity.x = myspeed * -1;
                        } else {
                            mysprite.body.velocity.x = myspeed;
                        }

                        var diffY = Math.abs(path[1].y - targetTile.y);
                        var diffX = Math.abs(path[1].x - targetTile.x);
                        if (diffY >= diffX) {
                            if (path[1].y < myTile.y) {
                                mysprite.animations.play('walk-up');
                            } else {
                                mysprite.animations.play('walk-down');
                            }
                        } else {
                            if (path[1].x < myTile.x) {
                                mysprite.animations.play('walk-left');
                            } else {
                                mysprite.animations.play('walk-right');
                            }
                        }
                    }
                });
                this.game.easystar.calculate();
            }
        }
    }]);

    return Zombie;
}(_AbstractCharacter3.default);

exports.default = Zombie;

},{"objects/AbstractCharacter":2}],6:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Boot = function (_Phaser$State) {
    _inherits(Boot, _Phaser$State);

    function Boot() {
        _classCallCheck(this, Boot);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Boot).apply(this, arguments));
    }

    _createClass(Boot, [{
        key: 'create',
        value: function create() {
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('Preload');
        }
    }]);

    return Boot;
}(Phaser.State);

exports.default = Boot;

},{}],7:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Menu = function (_Phaser$State) {
    _inherits(Menu, _Phaser$State);

    function Menu() {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).call(this));

        _this.epicAudio = null;
        _this.writtenAudio = null;
        _this.titleText = null;
        _this.playText = null;
        return _this;
    }

    _createClass(Menu, [{
        key: 'create',
        value: function create() {
            this.epicAudio = this.game.add.audio('menu-epic');
            this.writtenAudio = this.game.add.audio('sketching');
            //  Being mp3 files these take time to decode, so we can't play them instantly
            //  Using setDecodedCallback we can be notified when they're ALL ready for use.
            //  The audio files could decode in ANY order, we can never be sure which it'll be.
            this.game.sound.setDecodedCallback([this.epicAudio, this.writtenAudio], this.animateBriefing, this);
        }
    }, {
        key: 'shutdown',
        value: function shutdown() {
            this.writtenAudio.stop();
            this.epicAudio.stop();
            this.epicAudio.destroy();
            this.writtenAudio.destroy();
            this.titleText.destroy();
            this.playText.destroy();
            this.epicAudio = null;
            this.writtenAudio = null;
            this.titleText = null;
            this.playText = null;
        }
    }, {
        key: 'animateBriefing',
        value: function animateBriefing() {
            this.game.stage.backgroundColor = '#182d3b';

            var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            spaceKey.onDown.add(this.startGame, this);

            this.epicAudio.play();

            this.titleText = this.game.add.text(100, 0, 'Fast Food!', this.getFontStyle(60));
            this.addGradient(this.titleText);
            this.game.add.existing(this.titleText);
            var bounceTitle = this.game.add.tween(this.titleText).to({ y: 150 }, 2400, Phaser.Easing.Bounce.Out, true);

            this.playText = this.game.add.text(150, 250, '', this.getFontStyle(30));
            this.addGradient(this.playText);
            this.playText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
            this.playText.setTextBounds(0, 0, 100, 100);
            this.playText.wordWrapWidth = 10;
            this.game.add.existing(this.playText);
            this.game.add.tween(bounceTitle).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None);

            bounceTitle.onComplete.add(function () {
                this.writtenAudio.loopFull();
                var content = 'You wake up in a crazy area infested by explosive zombies,\nat the end of the timer, the army will destroy the area...\nClick on space to play!';
                var letterIndex = 0;
                this.game.time.events.repeat(70, content.length, function () {
                    this.playText.text = this.playText.text + content[letterIndex];
                    letterIndex++;
                    if (letterIndex == content.length) {
                        this.writtenAudio.stop();
                    }
                }, this);
            }, this);
        }
    }, {
        key: 'startGame',
        value: function startGame() {
            this.game.state.start('Play');
        }
    }, {
        key: 'getFontStyle',
        value: function getFontStyle(fontSize) {
            return { font: fontSize + "px FeastOfFlesh", fill: "#ff0044", boundsAlignH: "left", boundsAlignV: "top" };
        }
    }, {
        key: 'addGradient',
        value: function addGradient(text) {
            var gradient = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
            gradient.addColorStop(0, '#F77B7B');
            gradient.addColorStop(1, '#870505');
            text.fill = gradient;
        }
    }]);

    return Menu;
}(Phaser.State);

exports.default = Menu;

},{}],8:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _Zombie = require('objects/Zombie');

var _Zombie2 = _interopRequireDefault(_Zombie);

var _Victim = require('objects/Victim');

var _Victim2 = _interopRequireDefault(_Victim);

var _Hero = require('objects/Hero');

var _Hero2 = _interopRequireDefault(_Hero);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Play = function (_Phaser$State) {
    _inherits(Play, _Phaser$State);

    function Play(game) {
        _classCallCheck(this, Play);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Play).call(this, game));

        _this.map = null;
        _this.layer = null;
        _this.hero = null;
        _this.startX = null;
        _this.startY = null;
        _this.zombies = [];
        _this.victims = [];
        _this.exitX = 9300;
        _this.cursors = null;
        _this.frameRate = 5;
        _this.mainText = null;
        _this.easystar = null;
        _this.wallIndexes = [1, 2, 3, 9, 10, 11, 17, 18, 19, 20, 21, 25, 26, 27, 28, 29, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45];
        _this.shakesCount = null;
        _this.timerText = null;
        _this.levelTime = null;
        _this.remainingTime = null;
        _this.timer = null;
        _this.timerEvent = null;
        return _this;
    }

    _createClass(Play, [{
        key: 'create',
        value: function create() {
            this.levelTime = 120;
            this.remainingTime = this.levelTime;
            this.shakesCount = 0;
            this.playCountdown = false;
            this.playExplosion = false;

            this.game.time.advancedTiming = true;

            this.cursors = this.input.keyboard.createCursorKeys();

            this.map = this.add.tilemap('map');
            this.map.addTilesetImage('Desert');
            this.layer = this.map.createLayer('Ground');
            this.layer.resizeWorld();

            this.map.setCollision(this.wallIndexes);

            var characters = this.map.objects['Characters'];

            for (var i = 0; i < characters.length; i++) {
                if (characters[i].type == 'zombie') {
                    this.zombies.push(new _Zombie2.default(this, characters[i].name, { x: characters[i].x, y: characters[i].y }));
                } else if (characters[i].type == 'victim') {
                    this.victims.push(new _Victim2.default(this, characters[i].name, { x: characters[i].x, y: characters[i].y }));
                } else if (characters[i].type == 'hero') {
                    this.startX = characters[i].x;
                    this.startY = characters[i].y;
                    this.hero = new _Hero2.default(this, characters[i].name, { x: this.startX, y: this.startY });
                } else {
                    console.error(characters[i]);
                }
            }

            this.camera.follow(this.hero.sprite);

            this.easystar = new EasyStar.js();
            var grid = [];
            var tileRows = this.map.layer.data;
            for (var y = 0; y < tileRows.length; y++) {
                grid[y] = [];
                for (var x = 0; x < tileRows[y].length; x++) {
                    if (this.wallIndexes.indexOf(tileRows[y][x].index) == -1) {
                        grid[y][x] = 0;
                    } else {
                        grid[y][x] = 1;
                    }
                }
            }
            this.easystar.setGrid(grid);
            this.easystar.setAcceptableTiles([0]);
            this.easystar.enableDiagonals();

            this.timer = this.time.create();
            this.timerEvent = this.timer.add(Phaser.Timer.SECOND * this.levelTime, this.endTimer, this);
            this.timer.start();

            this.timerText = this.add.text(this.camera.x, this.camera.y, '', this.getFontStyle(32));
            this.timerText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
            this.timerText.setTextBounds(10, 10, 800, 100);
            this.timerText.fixedToCamera = true;

            this.mainText = this.game.add.text(0, 0, '', this.getFontStyle(32));
            this.mainText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
            this.mainText.setTextBounds(250, 220, 800, 100);

            this.mainText.fixedToCamera = true;

            var zombieAudios = [this.game.add.audio('brains1'), this.game.add.audio('brains2'), this.game.add.audio('brains3'), this.game.add.audio('crackly_groan'), this.game.add.audio('creak1'), this.game.add.audio('creak2'), this.game.add.audio('creak3'), this.game.add.audio('creak4'), this.game.add.audio('creak5'), this.game.add.audio('creak6'), this.game.add.audio('creak7')];
            this.game.time.events.loop(1500, function () {
                var zombieAudio = zombieAudios[Math.floor(Math.random() * zombieAudios.length)];
                zombieAudio.play();
            }, this);

            this.countdownAudio = this.game.add.audio('countdown');
        }
    }, {
        key: 'update',
        value: function update() {

            if (this.hero.isSafe == true) {
                this.displayMessage('Congratz! Out of hell!!!');
                this.timer.add(Phaser.Timer.SECOND * 3, this.openMenu, this);

                return;
            }

            if (this.hero.isDead == true) {
                this.transformHeroToZombie();

                return;
            }

            this.hero.play();

            for (var i = 0; i < this.zombies.length; i++) {
                this.zombies[i].play();
            }

            for (var i = 0; i < this.victims.length; i++) {
                if (this.victims[i].isDead == false) {
                    this.victims[i].play();
                } else {
                    this.transformVictimToZombie(this.victims[i]);
                    this.victims.splice(i, 1);
                }
            }

            this.updateCamera();
        }
    }, {
        key: 'render',
        value: function render() {

            this.game.debug.text(this.time.fps || '--', 2, 14, "#00ff00");
            if (this.timer.running) {
                this.remainingTime = Math.round((this.timerEvent.delay - this.timer.ms) / 1000);
                this.timerText.setText(this.formatTime(this.remainingTime));
                if (this.remainingTime == 20 && this.playCountdown == false) {
                    this.playCountdown = true;
                    this.countdownAudio.play();
                } else if (this.remainingTime < 2 && this.playExplosion == false) {
                    this.playExplosion = true;
                    this.shakeCamera(20);
                    this.finalSprite = this.game.add.sprite(this.hero.sprite.x, this.hero.sprite.y, 'finalexplosion');
                    this.finalSprite.anchor.setTo(0.5);
                    this.finalSprite.scale.setTo(4, 4);
                    this.finalSprite.animations.add('explosion');
                    this.finalSprite.animations.play('explosion', 20);
                    this.timer.add(Phaser.Timer.SECOND * 1, this.openMenu, this);
                }
            }
        }
    }, {
        key: 'shutdown',
        value: function shutdown() {
            for (var i = 0; i < this.zombies.length; i++) {
                this.zombies[i].destroy();
            }
            for (var i = 0; i < this.victims.length; i++) {
                this.victims[i].destroy();
            }
            this.hero.destroy();

            this.victims = [];
            this.zombies = [];
            this.hero = null;

            if (this.playCountdown) {
                this.countdownAudio.stop();
            }
        }
    }, {
        key: 'getFontStyle',
        value: function getFontStyle(fontSize) {
            return { font: fontSize + "px FeastOfFlesh", fill: "#ff0044", boundsAlignH: "left", boundsAlignV: "top" };
        }
    }, {
        key: 'endTimer',
        value: function endTimer() {
            this.timer.stop();
        }
    }, {
        key: 'formatTime',
        value: function formatTime(s) {
            var minutes = "0" + Math.floor(s / 60);
            var seconds = "0" + (s - minutes * 60);

            return minutes.substr(-2) + ":" + seconds.substr(-2);
        }
    }, {
        key: 'transformVictimToZombie',
        value: function transformVictimToZombie(victim) {
            var zombieSpriteKey = 'zombie' + victim.sprite.key.slice(-1);
            var newZombie = new _Zombie2.default(this, zombieSpriteKey, { x: victim.sprite.x, y: victim.sprite.y });
            newZombie.state = newZombie.HUNT;
            this.zombies.push(newZombie);
            this.displayMessage('Eaten, one more Zombie! Run! Run!', 2000);
            victim.destroy();
            this.shakeCamera(20);
        }
    }, {
        key: 'transformHeroToZombie',
        value: function transformHeroToZombie() {
            var zombieSpriteKey = 'zombie' + this.hero.sprite.key.slice(-1);
            var newZombie = new _Zombie2.default(this, zombieSpriteKey, { x: this.hero.sprite.x, y: this.hero.sprite.y });
            newZombie.state = newZombie.HUNT;
            this.zombies.push(newZombie);
            this.displayMessage('You\'re now one of us ...', 2000);
            this.hero.destroy();
            this.shakeCamera(20);
            this.timer.add(Phaser.Timer.SECOND * 2, this.openMenu, this);
        }
    }, {
        key: 'openMenu',
        value: function openMenu() {
            this.game.state.start('Menu');
        }
    }, {
        key: 'displayMessage',
        value: function displayMessage(content, time) {
            this.mainText.setText(content);
            this.game.time.events.add(time, function () {
                this.setText('');
            }, this.mainText);
        }
    }, {
        key: 'shakeCamera',
        value: function shakeCamera(count) {
            this.shakesCount = count;
        }
    }, {
        key: 'updateCamera',
        value: function updateCamera() {
            if (this.shakesCount > 0) {
                this.camera.unfollow();
                var sens = this.shakesCount * 0.5;
                var shakeX = 10;
                if (this.shakesCount % 2) {
                    this.camera.x += shakeX ? sens : 0;
                } else {
                    this.camera.x -= shakeX ? sens : 0;
                }
                this.shakesCount--;
            } else {
                this.camera.follow(this.hero.sprite);
            }
        }
    }]);

    return Play;
}(Phaser.State);

exports.default = Play;

},{"objects/Hero":3,"objects/Victim":4,"objects/Zombie":5}],9:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Preload = function (_Phaser$State) {
    _inherits(Preload, _Phaser$State);

    function Preload() {
        _classCallCheck(this, Preload);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Preload).apply(this, arguments));
    }

    _createClass(Preload, [{
        key: 'preload',
        value: function preload() {
            // thanks K. Macleod at http://incompetech.com/
            this.load.audio('menu-epic', 'assets/audio/Dangerous.mp3');
            // thanks netgfx for https://github.com/netgfx/Phaser-typewriter
            this.load.audio('sketching', 'assets/audio/pencilsketching.mp3');
            // thanks http://phaser.io/examples/v2/games/invaders
            this.load.audio('explosion', 'assets/audio/explosion.mp3');
            // thanks bart http://opengameart.org/content/25-spooky-sound-effects
            this.load.audio('brains1', 'assets/audio/spookysounds/brains.wav');
            this.load.audio('brains2', 'assets/audio/spookysounds/brains2.wav');
            this.load.audio('brains3', 'assets/audio/spookysounds/brains3.wav');
            this.load.audio('crackly_groan', 'assets/audio/spookysounds/crackly_groan.wav');
            this.load.audio('creak1', 'assets/audio/spookysounds/creak1.wav');
            this.load.audio('creak2', 'assets/audio/spookysounds/creak2.wav');
            this.load.audio('creak3', 'assets/audio/spookysounds/creak3.wav');
            this.load.audio('creak4', 'assets/audio/spookysounds/creak4.wav');
            this.load.audio('creak5', 'assets/audio/spookysounds/creak5.wav');
            this.load.audio('creak6', 'assets/audio/spookysounds/creak6.wav');
            this.load.audio('creak7', 'assets/audio/spookysounds/creak7.wav');
            // thanks Russintheus http://www.freesound.org/people/Russintheus/sounds/165089/#
            this.load.audio('countdown', 'assets/audio/165089__russintheus__countdown-boom.mp3');
            // thanks Curt http://opengameart.org/content/zombie-rpg-sprites
            this.load.spritesheet('zombie1', 'assets/sprites/Zombie1.png', 40, 40, 12);
            this.load.spritesheet('zombie2', 'assets/sprites/Zombie2.png', 40, 40, 12);
            this.load.spritesheet('zombie3', 'assets/sprites/Zombie3.png', 40, 40, 12);
            this.load.spritesheet('zombie4', 'assets/sprites/Zombie4.png', 40, 40, 12);
            this.load.spritesheet('zombie5', 'assets/sprites/Zombie5.png', 40, 40, 12);
            this.load.spritesheet('zombie6', 'assets/sprites/Zombie6.png', 40, 40, 12);
            this.load.spritesheet('zombie7', 'assets/sprites/Zombie7.png', 64, 64, 12);
            this.load.spritesheet('victim1', 'assets/sprites/Victim1.png', 40, 40, 12);
            this.load.spritesheet('victim2', 'assets/sprites/Victim2.png', 40, 40, 12);
            this.load.spritesheet('victim3', 'assets/sprites/Victim3.png', 40, 40, 12);
            this.load.spritesheet('victim4', 'assets/sprites/Victim4.png', 40, 40, 12);
            this.load.spritesheet('victim5', 'assets/sprites/Victim5.png', 40, 40, 12);
            this.load.spritesheet('victim6', 'assets/sprites/Victim6.png', 40, 40, 12);
            this.load.spritesheet('explode', 'assets/sprites/explode.png', 128, 128);
            // thanks http://rswhite.de/dgame5/?page=tutorial&tut=spritesheets
            this.load.spritesheet('finalexplosion', 'assets/sprites/final-explosion.png', 256, 256);

            this.load.image('Desert', 'assets/tilemaps/tiles/Desert.png');
            this.load.tilemap('map', "assets/tilemaps/maps/level1.json", null, Phaser.Tilemap.TILED_JSON);
        }
    }, {
        key: 'create',
        value: function create() {
            this.game.state.start('Menu');
        }
    }]);

    return Preload;
}(Phaser.State);

exports.default = Preload;

},{}]},{},[1])
//# sourceMappingURL=game.js.map
