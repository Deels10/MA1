class openingScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'openingScene' });
    }


    preload(){
    // intro image
    this.load.image('openingpage', 'assets/openingscene.jpg')

    }

    create() {
        window.bgSound - this.sound.add("bgSound").setLoop(true).play()

        this.add.image(0, 0, 'openingpage').setOrigin(0, 0);

        console.log("This is the opening page");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
            
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto instructions");
        this.scene.start("instructionsScene");
        }, this );
    
    }
    }