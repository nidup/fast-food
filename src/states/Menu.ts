
export default class Menu extends Phaser.State
{
    private epicAudio:Phaser.Sound = null;
    private writtenAudio:Phaser.Sound = null;
    private titleText:Phaser.Text = null;
    private playText:Phaser.Text = null;

    create () {
        this.epicAudio = this.game.add.audio('menu-epic');
        this.writtenAudio = this.game.add.audio('sketching');
        //  Being mp3 files these take time to decode, so we can't play them instantly
        //  Using setDecodedCallback we can be notified when they're ALL ready for use.
        //  The audio files could decode in ANY order, we can never be sure which it'll be.
        this.game.sound.setDecodedCallback([this.epicAudio, this.writtenAudio], this.animateBriefing, this);
    }

    shutdown () {
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

    animateBriefing () {
        this.game.stage.backgroundColor = '#182d3b';

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.startGame, this);

        this.epicAudio.play();

        this.titleText = this.game.add.text(100, 0, 'Fast Food!', this.getFontStyle(60));
        this.addGradient(this.titleText);
        this.game.add.existing(this.titleText);
        var bounceTitle = this.game.add.tween(this.titleText).to( { y: 150 }, 2400, Phaser.Easing.Bounce.Out, true);

        this.playText = this.game.add.text(150, 250, '', this.getFontStyle(30));
        this.addGradient(this.playText);
        this.playText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
        this.playText.setTextBounds(0, 0, 100, 100);
        this.playText.wordWrapWidth = 10;
        this.game.add.existing(this.playText);
        this.game.add.tween(bounceTitle).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None);

        bounceTitle.onComplete.add(
            function () {
                this.writtenAudio.loopFull();
                var content = 'You wake up in a crazy area infested by explosive zombies,\nat the end of the timer, the army will destroy the area...\nClick on space to play!';
                var letterIndex = 0;
                this.game.time.events.repeat(
                    70, content.length, function () {
                        this.playText.text = this.playText.text + content[letterIndex];
                        letterIndex++;
                        if (letterIndex == content.length) {
                            this.writtenAudio.stop();
                        }
                    }, this);
            },
            this
        );
    }

    startGame () {
        this.game.state.start('Play');
    }

    getFontStyle (fontSize) {
        return {font: fontSize + "px FeastOfFlesh", fill: "#ff0044", boundsAlignH: "left", boundsAlignV: "top"};
    }

    addGradient (text) {
        var gradient = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
        gradient.addColorStop(0, '#F77B7B');
        gradient.addColorStop(1, '#870505');
        text.fill = gradient;
    }
}
