
class level3 extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'level3' });
    }

    // incoming data from scene below
  init(data) {
    this.player = data.player
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


    } // end of create //

    update () {

        //market place exit
        if ( this.player.x > 586 && this.player.x <620 && this.player.y >298 && this.player.y > 327) {
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
    level1(player){
        console.log("exiting marketplace")
        this.scene.start("level1")
    }

}