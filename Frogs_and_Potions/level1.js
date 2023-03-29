
class level1 extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'level1' });
    }

    // incoming data from scene below
  init(data) {
    this.player = data.player
  }

    preload() {
// Step 1, load JSON
    this.load.tilemapTiledJSON("myworld", "myworld.tmj");

    // Step 2 : Preload any images here
    this.load.image("village", "assets/32x32.png");
    this.load.image("city", "assets/magecity.png");
    this.load.image("props", "assets/TX Props.png");
    this.load.image("grass", "assets/TX Tileset Grass.png");
    this.load.image("walls", "assets/TX Tileset Wall.png");

    } // end of preload //

    create (){
    console.log("animationScene")

    this.hitSound = this.sound.add("hitSound")

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "myworld" });

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
    this.lakeLayer = map.createLayer("lakeLayer",tilesArray,0,0);
    this.docksLayer = map.createLayer("docksLayer",tilesArray,0,0);
    this.buildingsLayer = map.createLayer("buildingsLayer",tilesArray,0,0);
    this.fencesandplantsLayer = map.createLayer("fencesandplantsLayer",tilesArray,0,0);
    this.secretgarden5Layer = map.createLayer("secretgarden5Layer",tilesArray,0,0);
    this.secretgarden4Layer = map.createLayer("secretgarden4Layer",tilesArray,0,0);
    this.secretgarden3Layer = map.createLayer("secretgarden3Layer",tilesArray,0,0);
    this.secretgarden2Layer = map.createLayer("secretgarden2Layer",tilesArray,0,0);
    this.secretgardenLayer = map.createLayer("secretgardenLayer",tilesArray,0,0);
    this.itemsLayer = map.createLayer("itemsLayer",tilesArray,0,0);
    this.treesLayer = map.createLayer("treesLayer",tilesArray,0,0);
    this.moretreesLayer = map.createLayer("moretreesLayer",tilesArray,0,0);
    this.lastfewtreesLayer = map.createLayer("lastfewtreesLayer",tilesArray,0,0);

    var start = map.findObject("objectLayer", obj => obj.name === "start")

    this.cursors = this.input.keyboard.createCursorKeys(); 
    this.player = this.physics.add.sprite(start.x, start.y, 'aesil').play("aesil-down")
    this.crow = this.physics.add.sprite(626,1640,'crow').play("crow-flying")
    this.crow2 = this.physics.add.sprite(1453,304,'crow').play("crow-flying")
    this.crow3 = this.physics.add.sprite(504,354,'crow').play("crow-flying")


    this.physics.add.overlap(
      this.player, // player
      this.crow, // enemy
      this.overlapCrow,   // function to call 
      null, 
      this
      );

      this.physics.add.overlap(
        this.player, // player
        this.crow2, // enemy
        this.overlapCrow,   // function to call 
        null, 
        this
        ); 
        
        this.physics.add.overlap(
          this.player, // player
          this.crow3, // enemy
          this.overlapCrow3,   // function to call 
          null, 
          this
          );   



    window.player = this.player

    // camera follow player
    this.cameras.main.startFollow(this.player);

    //collision
    this.treesLayer.setCollisionByProperty({tree:true})
    this.moretreesLayer.setCollisionByProperty({tree:true})
    this.lastfewtreesLayer.setCollisionByProperty({tree:true})
    this.physics.add.collider(this.treesLayer,this.player);
    this.physics.add.collider(this.moretreesLayer,this.player);
    this.physics.add.collider(this.lastfewtreesLayer,this.player);

    this.buildingsLayer.setCollisionByExclusion(-1,true)
    this.physics.add.collider(this.buildingsLayer,this.player)

    this.fencesandplantsLayer.setCollisionByExclusion(-1,true)
    this.physics.add.collider(this.fencesandplantsLayer,this.player)

    this.secretgardenLayer.setCollisionByExclusion(-1,true)
    this.physics.add.collider(this.secretgardenLayer,this.player)


    this.time.addEvent({
        delay: 0,
        callback: this.moveDownUp,
        callbackScope: this,
        loop: false,
      });

    this.time.addEvent({
        delay: 3000,
        callback: this.moveRightLeft,
        callbackScope: this,
        loop: false,
      });

    


    } // end of create //

    update () {
        
        //witch shop enter
        if ( this.player.x > 944 && this.player.x < 976 && this.player.y >1040 && this.player.y <1050) {
            console.log("enter witch shop")
            this.level2()
        }
    

        //marketplace enter
        if ( this.player.x >528 && this.player.x <573 && this.player.y > 1008 && this.player.y < 1021) {
            console.log("enter marketplace")
            this.level3()
        }

        //secret garden enter
        if ( this.player.x >1165 && this.player.x <1200  && this.player.y >453 && this.player.y <501) {
            console.log("enter secret garden")
            this.level4()
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

    level2(player){
        console.log("entering witch shop");
        this.scene.start("level2");
    }

    level3(player){
        console.log("entering marketplace");
        this.scene.start("level3");
    }

    level4(player){
        console.log("entering secret garden");
        this.scene.start("level4");
    }

    moveDownUp() {
        console.log("moveDownUp");
        this.tweens.timeline({
          targets: this.crow,
          ease: "Linear",
          loop: -1, // loop forever
          duration: 3000,
          tweens: [
            {
              y: 1794,
            },
            {
              y: 1640,
            },
          ],
        });
      }

      moveUpDown() {
        console.log("moveUpDown");
        this.tweens.timeline({
          targets: this.crow3,
          ease: "Linear",
          loop: -1, // loop forever
          duration: 3000,
          tweens: [
            {
              y: 272,
            },
            {
              y: 354,
            },
          ],
        });
      }

      moveRightLeft() {
        console.log("moveRightLeft");
        this.tweens.timeline({
          targets: this.crow2,
          loop: -1, // loop forever
          ease: "Linear",
          duration: 2000,
          tweens: [
            {
              x: 1071,
            },
            {
              x: 1453,
            },
          ],
        });
      }

      overlapCrow(){
        console.log("***enemyHit")

        //disable enemy after overlap 
        enemy.disableBody(true, true);

        // Play a sound
        this.hitSound.play();

        // shake the screen 
        this.cameras.main.shake(200);
      }
    
}