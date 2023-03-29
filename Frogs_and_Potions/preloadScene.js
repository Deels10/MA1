class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
    }

    preload () {
        this.load.spritesheet('aesil', 'assets/aesil_spritesheet.png',{ frameWidth:32, frameHeight:32 });
        this.load.spritesheet('crow', 'assets/crow_spritesheet.png',{frameWidth:32, frameHeight:32});


        this.load.audio('walkingSound','assets/footsteps.mp3')
        this.load.audio('hitSound','assets/crow.mp3')
    }



    create () {

        console.log("preloadScene")
        this.add.text(10,500, 'Animation labs, press spacebar to continue', 
        { font: '24px Courier', fill: '#ffffff' });
        this.add.text(120, 310, 'Press 2 to enter witch shop', { font: '24px Courier', fill: '#000000' });
        this.add.text(120, 350, 'Press 3 to go to marketplace', { font: '24px Courier', fill: '#000000' });
        this.add.text(120, 350, 'Press 4 to enter secret garden', { font: '24px Courier', fill: '#000000' });

            var spaceDown = this.input.keyboard.addKey('SPACE');
            var key1 = this.input.keyboard.addKey(49)
            var key2 = this.input.keyboard.addKey(50)
            var key3 = this.input.keyboard.addKey(51)
            

            spaceDown.on('down', function(){
            this.scene.start("level1");
            }, this );

            key1.on('down', function(){
            this.scene.start("level2");
            }, this );

            key2.on('down', function(){
                this.scene.start("level3");
                }, this );

            key3.on('down', function(){
            this.scene.start("level4");
            }, this );
    
        this.anims.create({
            key:'aesil-up',
            frames:this.anims.generateFrameNumbers('aesil',
            { start:0, end:2 }),
            frameRate:5,
            repeat:-1
        });
    
        this.anims.create({
            key:'aesil-left',
            frames:this.anims.generateFrameNumbers('aesil',
            { start:3, end:5 }),
            frameRate:5,
            repeat:-1
        });
    
        this.anims.create({
            key:'aesil-down',
            frames:this.anims.generateFrameNumbers('aesil',
            { start:6, end:8 }),
            frameRate:5,
            repeat:-1
        });
    
        this.anims.create({
            key:'aesil-right',
            frames:this.anims.generateFrameNumbers('aesil',
            { start:9, end:11 }),
            frameRate:5,
            repeat:-1
        });

////////////////////////////////////////////////////////////

        this.anims.create({
            key:'crow-flying',
            frames:this.anims.generateFrameNumbers('crow',
            { start:0, end:1 }),
            frameRate:5,
            repeat:-1
        });
    }

}
