class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
    }


    preload () {
        //Aesil spritesheet
        this.load.spritesheet('aesil', 'assets/aesil_spritesheet.png',{ frameWidth:32, frameHeight:32 });

        //enemy spritesheet
        this.load.spritesheet('crow', 'assets/crow_spritesheet.png',{frameWidth:32, frameHeight:32});

        //collectible, npc, potions
        //collectibles spritesheet
    this.load.spritesheet('flower', 'assets/flower_spritesheet.png',{frameWidth:32, frameHeight:32});
    this.load.spritesheet('herb', 'assets/herb_spritesheet.png',{frameWidth:32, frameHeight:32});
    this.load.spritesheet('lilypad', 'assets/lilypad_spritesheet.png',{frameWidth:32, frameHeight:32});
    this.load.spritesheet('mushroom', 'assets/mushroom_spritesheet.png',{frameWidth:32, frameHeight:32});

    //npc spritesheet
    this.load.spritesheet('npc1', 'assets/npc_1_spritesheet.png',{frameWidth:64, frameHeight:64});
    this.load.spritesheet('npc2', 'assets/npc_2_spritesheet.png',{frameWidth:64, frameHeight:64});
    this.load.spritesheet('npc3', 'assets/npc_3_spritesheet.png',{frameWidth:64, frameHeight:64});
    this.load.spritesheet('npc4', 'assets/npc_4_spritesheet.png',{frameWidth:64, frameHeight:64});
    this.load.spritesheet('bluemagician', 'assets/blue_magician_spritesheet.png',{frameWidth:64, frameHeight:64});
    this.load.spritesheet('redmagician', 'assets/red_magician_spritesheet.png',{frameWidth:64, frameHeight:64});

    //potions
    this.load.spritesheet('healthpotion', 'assets/health_potion_spritesheet.png',{frameWidth:32, frameHeight:32});
    this.load.spritesheet('luckpotion', 'assets/luck_potion_spritesheet.png',{frameWidth:32, frameHeight:32});
    this.load.spritesheet('prosperitypotion', 'assets/prosperity_potion_spritesheet.png',{frameWidth:32, frameHeight:32});


        this.load.audio('hitSound','assets/crow.mp3')
        this.load.audio('popSound','assets/popSound.mp3')
        this.load.audio('deathSound', 'assets/deathsound.mp3')
        this.load.audio('bgSound','assets/bg_music.mp3')
        
    }



    create () {
        console.log("preloadScene")
        this.add.text(10,500, 'Animation labs, press spacebar to continue', 
        { font: '24px Courier', fill: '#ffffff' });

            var spaceDown = this.input.keyboard.addKey('SPACE');
            
        
        //aesil animation
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
        //enemy animation
        this.anims.create({
            key:'crow-flying',
            frames:this.anims.generateFrameNumbers('crow',
            { start:0, end:1 }),
            frameRate:5,
            repeat:-1
        });

////////////////////////////////////////////////////////////////
//collectible and nps
//collectibles and npc animation
this.anims.create({
    key:'flowerbounce',
    frames:this.anims.generateFrameNumbers('flower',
    { start:0, end:1 }),
    frameRate:2,
    repeat:-1
});


this.anims.create({
    key:'herbsway',
    frames:this.anims.generateFrameNumbers('herb',
    { start:0, end:1 }),
    frameRate:2,
    repeat:-1
});

this.anims.create({
    key:'lilysink',
    frames:this.anims.generateFrameNumbers('lilypad',
    { start:0, end:1 }),
    frameRate:2,
    repeat:-1
});

this.anims.create({
    key:'mushroombounce',
    frames:this.anims.generateFrameNumbers('mushroom',
    { start:0, end:1 }),
    frameRate:2,
    repeat:-1
});

this.anims.create({
    key:'npc1bounce',
    frames:this.anims.generateFrameNumbers('npc1',
    { start:0, end:1 }),
    frameRate:2,
    repeat:-1
});

this.anims.create({
    key:'npc2bounce',
    frames:this.anims.generateFrameNumbers('npc2',
    { start:0, end:1 }),
    frameRate:2,
    repeat:-1
});

this.anims.create({
    key:'npc3bounce',
    frames:this.anims.generateFrameNumbers('npc3',
    { start:0, end:1 }),
    frameRate:2,
    repeat:-1
});

this.anims.create({
    key:'npc4bounce',
    frames:this.anims.generateFrameNumbers('npc4',
    { start:0, end:1 }),
    frameRate:2,
    repeat:-1
});

this.anims.create({
    key:'bluemagiciansparkle',
    frames:this.anims.generateFrameNumbers('bluemagician',
    { start:0, end:2 }),
    frameRate:2,
    repeat:-1
});

this.anims.create({
    key:'redmagiciansparkle',
    frames:this.anims.generateFrameNumbers('redmagician',
    { start:0, end:2 }),
    frameRate:2,
    repeat:-1
});

        this.scene.start("openingScene");



///////////////////////////////////////////////////////////
//potions animations
//potions animation
this.anims.create({
    key:'healthpotionshake',
    frames:this.anims.generateFrameNumbers('healthpotion',
    { start:0, end:2 }),
    frameRate:5,
    repeat:-1
    });

    this.anims.create({
    key:'luckpotionshake',
    frames:this.anims.generateFrameNumbers('luckpotion',
    { start:0, end:2 }),
    frameRate:5,
    repeat:-1
    });

    this.anims.create({
      key:'prosperitypotionshake',
      frames:this.anims.generateFrameNumbers('prosperitypotion',
      { start:0, end:2 }),
      frameRate:5,
      repeat:-1
  });


       
    } // end of create
    
    
        

}
