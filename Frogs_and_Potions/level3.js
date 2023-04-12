
class level3 extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'level3' });
    }

    // incoming data from scene below
  init(data) {
    this.player = data.player
    this.inventory = data.inventory
  }

    preload() {
// Step 1, load JSON
    this.load.tilemapTiledJSON("market", "level3.tmj");

    // Step 2 : Preload any images here
    this.load.image("village", "assets/32x32.png");
    this.load.image("city", "assets/magecity.png");
    this.load.image("props", "assets/TX Props.png");
    this.load.image("grass", "assets/TX Tileset Grass.png");
    this.load.image("walls", "assets/TX Tileset Wall.png");

    //npc spritesheet
    this.load.spritesheet('npc1', 'assets/npc_1_spritesheet.png',{frameWidth:64, frameHeight:64});
    this.load.spritesheet('npc2', 'assets/npc_2_spritesheet.png',{frameWidth:64, frameHeight:64});
    this.load.spritesheet('npc3', 'assets/npc_3_spritesheet.png',{frameWidth:64, frameHeight:64});
    this.load.spritesheet('npc4', 'assets/npc_4_spritesheet.png',{frameWidth:64, frameHeight:64});
    this.load.spritesheet('bluemagician', 'assets/blue_magician_spritesheet.png',{frameWidth:64, frameHeight:64});
    this.load.spritesheet('redmagician', 'assets/red_magician_spritesheet.png',{frameWidth:64, frameHeight:64});

    } // end of preload //

    create (){
    console.log("animationScene")

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "market" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let villageTiles = map.addTilesetImage("32x32", "village");
    let cityTiles = map.addTilesetImage("magecity", "city");
    let propsTiles = map.addTilesetImage("TX Props", "props");
    let grassTiles = map.addTilesetImage("TX Tileset Grass", "grass");
    let wallsTiles = map.addTilesetImage("TX Tileset Wall", "walls");
    

    // Step 5  create an array of tiles
    let tilesArray = [
      villageTiles,
      cityTiles,
      propsTiles,
      grassTiles,
      wallsTiles
    ];

    // Step 6  Load in layers by layers
    this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);
    this.buildingsLayer = map.createLayer("buildingsLayer",tilesArray,0,0);
    this.fenceLayer = map.createLayer("fenceLayer",tilesArray,0,0);
    this.itemsLayer = map.createLayer("itemsLayer",tilesArray,0,0);
    this.items2Layer = map.createLayer("items2Layer",tilesArray,0,0);

    var start = map.findObject("objectLayer", obj => obj.name === "start")

    this.cursors = this.input.keyboard.createCursorKeys(); 
    this.player = this.physics.add.sprite(start.x, start.y, 'aesil').play("aesil-left") 
    window.player = this.player
    

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

    this.npc1 = this.physics.add.sprite(207,263, 'npc1').play("npc1bounce")
    this.npc3 = this.physics.add.sprite(368,464, 'npc3').play("npc3bounce")
    this.npc4 = this.physics.add.sprite(528, 152, 'npc4').play("npc4bounce")

    this.physics.add.overlap(
        this.player, // player
        [this.npc4], // npc
        this.giveHealthPotion,   // function to call 
        null, 
        this
        );
  
        this.physics.add.overlap(
          this.player, // player
          [this.npc1], // npc
          this.giveLuckPotion,   // function to call 
          null, 
          this
          );
  
        this.physics.add.overlap(
          this.player, // player
          [this.npc3], // npc
          this.giveProsperityPotion,   // function to call 
          null, 
          this
          );

    // camera follow player
    this.cameras.main.startFollow(this.player);

    //collision
    this.buildingsLayer.setCollisionByExclusion(-1,true)
    this.physics.add.collider(this.buildingsLayer,this.player)
    this.fenceLayer.setCollisionByExclusion(-1,true)
    this.physics.add.collider(this.fenceLayer,this.player)
    this.itemsLayer.setCollisionByExclusion(-1,true)
    this.physics.add.collider(this.fenceLayer,this.player)
    this.itemsLayer.setCollisionByExclusion(-1,true)
    this.physics.add.collider(this.itemsLayer,this.player)
    this.items2Layer.setCollisionByExclusion(-1,true)
    this.physics.add.collider(this.items2Layer,this.player)


    this.player.setCollideWorldBounds(true)
    this.physics.world.bounds.width = this.groundLayer.width
    this.physics.world.bounds.height = this.groundLayer.height


    } // end of create //

    update () {

        //market place exit
        if ( this.player.x > 596 && this.player.y <319) {
            console.log("exit market place")
            this.level1()
        }

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
    
            this.player.anims.play('aesil-left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
    
            this.player.anims.play('aesil-right', true);
        }
        else if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-160);
    
            this.player.anims.play('aesil-up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(160);
    
            this.player.anims.play('aesil-down', true);
        }
        else {
            this.player.setVelocity(0);
            this.player.anims.stop();
        }
    } // end of update // 
    level1(){
        console.log("back to main world")
        let player = {}
        player.x = 568
        player.y = 1008
        this.scene.start("level1",{player: player})
    }

    giveHealthPotion(){
        console.log("***givenPotion")
        this.physics.add.sprite(this.npc4.x+50, this.npc4.y, 'healthpotion').play("healthpotionshake")
        player.x = this.npc4.x-90
        window.potionGiven++
        console.log(window.potionGiven)
      }

      giveLuckPotion(){
        console.log("***givenPotion")
        this.physics.add.sprite(this.npc1.x+50, this.npc1.y, 'luckpotion').play("luckpotionshake")
        player.x = this.npc1.x+90
        window.potionGiven++
        console.log(window.potionGiven)
      }

      giveProsperityPotion(){
        console.log("***givenPotion")
        this.physics.add.sprite(this.npc3.x+50, this.npc3.y, 'prosperitypotion').play("prosperitypotionshake")
        player.x = this.npc3.x+90
        window.potionGiven++
        console.log(window.potionGiven)
      }

}