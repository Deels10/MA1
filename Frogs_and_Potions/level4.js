
class level4 extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'level4' });
    }

    // incoming data from scene below
  init(data) {
    this.playerPos = data.player
    this.inventory = data.inventory
  }

    preload() {
// Step 1, load JSON
    this.load.tilemapTiledJSON("secretgarden", "level4.tmj");

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
    let map = this.make.tilemap({ key: "secretgarden" });

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
    this.planthedgeLayer = map.createLayer("planthedgeLayer",tilesArray,0,0);
    this.plantsLayer = map.createLayer("plantsLayer",tilesArray,0,0);
    this.furnitureLayer = map.createLayer("furnitureLayer",tilesArray,0,0);
    this.fireLayer = map.createLayer("fireLayer",tilesArray,0,0);    

    var start = map.findObject("objectLayer", obj => obj.name === "start")

    this.cursors = this.input.keyboard.createCursorKeys(); 
    this.player = this.physics.add.sprite(start.x, start.y, 'aesil').play("aesil-left") 
    window.player = this.player
  
    this.anims.create({
        key:'bluemagiciansparkle',
        frames:this.anims.generateFrameNumbers('bluemagician',
        { start:0, end:2 }),
        frameRate:2,
        repeat:-1
    });

    this.anims.create({
        key:'luckpotionshake',
        frames:this.anims.generateFrameNumbers('luckpotion',
        { start:0, end:2 }),
        frameRate:5,
        repeat:-1
        });
    

    this.bluemagician = this.physics.add.sprite(138,240, 'bluemagician').play("bluemagiciansparkle")

    this.physics.add.overlap(
        this.player, // player
        [this.bluemagician], // npc
        this.giveLuckPotion,   // function to call 
        null, 
        this
        );
    

    // camera follow player
    this.cameras.main.startFollow(this.player);

    //collision
    this.furnitureLayer.setCollisionByExclusion(-1,true)
    this.physics.add.collider(this.furnitureLayer,this.player)
    this.fireLayer.setCollisionByExclusion(-1,true)
    this.physics.add.collider(this.fireLayer,this.player)
    this.planthedgeLayer.setCollisionByExclusion(-1,true)
    this.physics.add.collider(this.planthedgeLayer,this.player)
    this.plantsLayer.setCollisionByExclusion(-1,true)
    this.physics.add.collider(this.plantsLayer,this.player)


    this.player.setCollideWorldBounds(true)
    this.physics.world.bounds.width = this.groundLayer.width
    this.physics.world.bounds.height = this.groundLayer.height

    } // end of create //

    update () {

        //secret garden exit
        if ( this.player.x > 620 && this.player.x <627 && this.player.y > 272 && this.player.y < 619) {
            console.log("exit secret garden")
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
        player.x = 1224
        player.y = 474
        this.scene.start("level1",{player: player})
    }

    giveLuckPotion(){
        console.log("***givenPotion")
        this.physics.add.sprite(this.bluemagician.x+50, this.bluemagician.y, 'luckpotion').play("luckpotionshake")
        player.x = this.bluemagician.x+90
        window.potionGiven++
        console.log(window.potionGiven)
      }
}
