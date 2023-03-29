
class level2 extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'level2' });
    }

    // incoming data from scene below
  init(data) {
    this.player = data.player
  }

    preload() {
// Step 1, load JSON
    this.load.tilemapTiledJSON("witch'spotionshop", "level2.tmj");

    // Step 2 : Preload any images here
    this.load.image("village", "assets/32x32.png");
    this.load.image("city", "assets/magecity.png");
    this.load.image("props", "assets/TX Props.png");
    this.load.image("grass", "assets/TX Tileset Grass.png");
    this.load.image("walls", "assets/TX Tileset Wall.png");

    } // end of preload //

    create (){
    console.log("animationScene")

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "witch'spotionshop" });

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
    this.pathLayer = map.createLayer("pathLayer",tilesArray,0,0);
    this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);
    this.furnitureLayer = map.createLayer("furnitureLayer",tilesArray,0,0);
    this.itemsLayer = map.createLayer("itemsLayer",tilesArray,0,0);
    this.plantsLayer = map.createLayer("plantsLayer",tilesArray,0,0);
    

    var start = map.findObject("objectLayer", obj => obj.name === "start")

    this.cursors = this.input.keyboard.createCursorKeys(); 
    this.player = this.physics.add.sprite(start.x, start.y, 'aesil').play("aesil-up")

    window.player = this.player

    // camera follow player
    this.cameras.main.startFollow(this.player);

    //collision
    this.furnitureLayer.setCollisionByExclusion(-1,true)
    this.physics.add.collider(this.furnitureLayer,this.player)
    this.itemsLayer.setCollisionByExclusion(-1,true)
    this.physics.add.collider(this.itemsLayer,this.player)
    this.plantsLayer.setCollisionByExclusion(-1,true)
    this.physics.add.collider(this.plantsLayer,this.player)

    } // end of create //

    update () {

        //witch shop exit
        if ( this.player.x > 320 && this.player.y > 615) {
            console.log("exit witch shop")
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

    level1(player){
        console.log("exiting witch shop")
        this.scene.start("level1")
    }
}