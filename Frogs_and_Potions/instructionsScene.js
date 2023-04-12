class instructionsScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'instructionsScene' });
    }


    preload(){
    // intro image
    this.load.image('instructions', 'assets/instructions.jpg');

    }

    create() {
        this.add.image(0, 0, 'instructions').setOrigin(0, 0);

        console.log("This is the instructions");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
            
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level1");
        let player = {}
        player.x = 962
        player.y = 1085
        this.scene.start("level1",{player: player})
        }, this );
    
    }
    }