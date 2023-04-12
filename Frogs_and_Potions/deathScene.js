class deathScene extends Phaser.Scene {

    constructor() {
        super('deathScene');
    }

    preload() {
        this.load.image('deathscene', 'assets/deathscene.jpg');
    }

    create() {
        this.game.sound.stopAll()
    
        this.add.image(0, 0, 'deathscene').setOrigin(0, 0);
        console.log("***you died")

        window.deathSound - this.sound.add("deathSound").setLoop(true).play()
        //reload 3 hearts 
        window.flower = 0
        window.herb = 0
        window.lilypad = 0
        window.mushroom = 0
        window.potion = 0
        window.heart = 3;

        // 'T' key
        var keyT = this.input.keyboard.addKey(84);

        keyT.on('down', function () {
            console.log('Try Again');
            this.scene.start("openingScene");
        }, this);

        console.log("inventory");

        // start another scene in parallel
        this.scene.stop("inventory");
    }
}
