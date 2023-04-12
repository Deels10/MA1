     var audioManager;


class level1 extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'level1' });
    }

    // incoming data from scene below
  init(data) {
    this.player = data.player 
    this.inventory = data.inventory
  }
  

    preload() {// Step 1, load JSON
    this.load.tilemapTiledJSON("myworld", "myworld.tmj");

    // Step 2 : Preload any images here
    this.load.image("village", "assets/32x32.png");
    this.load.image("city", "assets/magecity.png");
    this.load.image("props", "assets/TX Props.png");
    this.load.image("grass", "assets/TX Tileset Grass.png");
    this.load.image("walls", "assets/TX Tileset Wall.png");

    //hearts
    this.load.image('heart', 'assets/heart.png');

    //music
    // this.load.audio('bgSound','assets/bg_music.mp3')

    } // end of preload //

    create (){
    console.log("animationScene")

    this.deathSound = this.sound.add("deathSound")
    this.hitSound = this.sound.add("hitSound")
    this.popSound = this.sound.add("popSound")

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

    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height

    var start = map.findObject("objectLayer", obj => obj.name === "start")

    this.cursors = this.input.keyboard.createCursorKeys(); 
    this.player = this.physics.add.sprite(this.player.x, this.player.y, 'aesil').play("aesil-down")
    this.crow = this.physics.add.sprite(626,1640,'crow').play("crow-flying")
    this.crow2 = this.physics.add.sprite(1453,304,'crow').play("crow-flying")
    this.crow3 = this.physics.add.sprite(504,354,'crow').play("crow-flying")
    this.crow4 = this.physics.add.sprite(1357,842,'crow').play("crow-flying")
    this.crow5 = this.physics.add.sprite(1744,1352,'crow').play("crow-flying")
    this.crow6 = this.physics.add.sprite(1200,1549,'crow').play("crow-flying")
    this.crow7 = this.physics.add.sprite(722,730,'crow').play("crow-flying")
    this.crow8 = this.physics.add.sprite(791,1325,'crow').play("crow-flying")
    this.crow9 = this.physics.add.sprite(304,581,'crow').play("crow-flying")
    this.crow10 = this.physics.add.sprite(1552,1549,'crow').play("crow-flying")

    //enemy overlap
    this.physics.add.overlap(
      this.player, // player
      [this.crow, this.crow2, this.crow3, this.crow4, this.crow5, this.crow6, this.crow7, this.crow8, this.crow9, this.crow10], // enemy
      this.overlapCrow,   // function to call 
      null, 
      this
      );

    //flower stuff
    this.flower = this.physics.add.sprite(592,1136, 'flower').play("flowerbounce")
    this.flower1 = this.physics.add.sprite(1111,834, 'flower').play("flowerbounce")
    this.flower2 = this.physics.add.sprite(1570,752, 'flower').play("flowerbounce")
    this.flower3 = this.physics.add.sprite(1573,1648, 'flower').play("flowerbounce")
    this.flower4 = this.physics.add.sprite(845,109, 'flower').play("flowerbounce")
    this.flower5 = this.physics.add.sprite(45,79, 'flower').play("flowerbounce")
    this.flower6 = this.physics.add.sprite(160,1690, 'flower').play("flowerbounce")
    this.flower7 = this.physics.add.sprite(1047,1738, 'flower').play("flowerbounce")

    this.physics.add.overlap(
    this.player, // player
    [this.flower, this.flower1, this.flower2, this.flower3, this.flower4, this.flower5, this.flower6, this.flower7], // item
    this.overlapCollectible,   // function to call 
    null, 
    this
    );
    
    
    //herb stuff
    this.herb = this.physics.add.sprite(1429,663, 'herb').play("herbsway")
    this.herb1 = this.physics.add.sprite(1762,976, 'herb').play("herbsway")
    this.herb2 = this.physics.add.sprite(816,565, 'herb').play("herbsway")
    this.herb3 = this.physics.add.sprite(272,480, 'herb').play("herbsway")
    this.herb4 = this.physics.add.sprite(343,1168, 'herb').play("herbsway")
    this.herb5 = this.physics.add.sprite(560,1488, 'herb').play("herbsway")
    this.herb6 = this.physics.add.sprite(1023,1528, 'herb').play("herbsway")
    
    this.physics.add.overlap(
    this.player, // player
    [this.herb, this.herb1, this.herb2, this.herb3, this.herb4, this.herb5, this.herb6], // item
    this.overlapCollectible2,   // function to call 
    null, 
    this
    );


    //lilypad stuff
    this.lilypad = this.physics.add.sprite(722,842, 'lilypad').play("lilysink")
    this.lilypad1 = this.physics.add.sprite(634,589, 'lilypad').play("lilysink")
    this.lilypad2 = this.physics.add.sprite(478,440, 'lilypad').play("lilysink")
    this.lilypad3 = this.physics.add.sprite(839,1864, 'lilypad').play("lilysink")
    this.lilypad4 = this.physics.add.sprite(1364,1898, 'lilypad').play("lilysink")

    this.physics.add.overlap(
    this.player, // player
    [this.lilypad, this.lilypad1, this.lilypad2, this.lilypad3, this.lilypad4], // item
    this.overlapCollectible3,   // function to call 
    null, 
    this
    );
    

    //mushroom stuff
    this.mushroom = this.physics.add.sprite(1040,1200, 'mushroom').play("mushroombounce")
    this.mushroom1 = this.physics.add.sprite(1730,344, 'mushroom').play("mushroombounce")
    this.mushroom2 = this.physics.add.sprite(944,368, 'mushroom').play("mushroombounce")
    this.mushroom3 = this.physics.add.sprite(304,112, 'mushroom').play("mushroombounce")
    this.mushroom4 = this.physics.add.sprite(490,759, 'mushroom').play("mushroombounce")
    this.mushroom5 = this.physics.add.sprite(157,1392, 'mushroom').play("mushroombounce")
    this.mushroom6 = this.physics.add.sprite(1757,1754, 'mushroom').play("mushroombounce")
    this.mushroom7 = this.physics.add.sprite(1437,1261, 'mushroom').play("mushroombounce")

    this.physics.add.overlap(
    this.player, // player
    [this.mushroom, this.mushroom1, this.mushroom2, this.mushroom3, this.mushroom4, this.mushroom5, this.mushroom6, this.mushroom7], // item
    this.overlapCollectible4,   // function to call 
    null, 
    this
    );
    
    
    //npc stuff
    this.npc1 = this.physics.add.sprite(861,1621, 'npc1').play("npc1bounce")
    this.npc2 = this.physics.add.sprite(1605,1040, 'npc2').play("npc2bounce")
    this.redmagician = this.physics.add.sprite(176,221, 'redmagician').play("redmagiciansparkle")

    this.physics.add.overlap(
      this.player, // player
      [this.npc1], // npc
      this.giveHealthPotion,   // function to call 
      null, 
      this
      );

      this.physics.add.overlap(
        this.player, // player
        [this.npc2], // npc
        this.giveLuckPotion,   // function to call 
        null, 
        this
        );

      this.physics.add.overlap(
        this.player, // player
        [this.redmagician], // npc
        this.giveProsperityPotion,   // function to call 
        null, 
        this
        );

    //camera follows player
    window.player = this.player
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
        delay: 0,
        callback: this.moveDownUp3,
        callbackScope: this,
        loop: false,
      });

      this.time.addEvent({
        delay: 0,
        callback: this.moveDownUp6,
        callbackScope: this,
        loop: false,
      });

      this.time.addEvent({
        delay: 0,
        callback: this.moveDownUp10,
        callbackScope: this,
        loop: false,
      });

    this.time.addEvent({
        delay: 0,
        callback: this.moveRightLeft,
        callbackScope: this,
        loop: false,
      });

      this.time.addEvent({
        delay: 0,
        callback: this.moveRightLeft4,
        callbackScope: this,
        loop: false,
      });  

      this.time.addEvent({
        delay: 0,
        callback: this.moveRightLeft5,
        callbackScope: this,
        loop: false,
      });
      
      this.time.addEvent({
        delay: 0,
        callback: this.moveRightLeft7,
        callbackScope: this,
        loop: false,
      });

      this.time.addEvent({
        delay: 0,
        callback: this.moveRightLeft8,
        callbackScope: this,
        loop: false,
      });

      this.time.addEvent({
        delay: 0,
        callback: this.moveRightLeft9,
        callbackScope: this,
        loop: false,
      });


  this.player.setCollideWorldBounds(true)


  //inventory bar
  var rect = new Phaser.Geom.Rectangle(255, 0, 300, 50);
        var graphics = this.add.graphics({ fillStyle: { color: '0xFF8C00 ' } });
        graphics.fillRectShape(rect).setScrollFactor(0)


  //stuff
  this.flower = this.add.image (400, 25, 'flower').setScrollFactor(0);
  this.herb = this.add.image (440, 25, 'herb').setScrollFactor(0);
  this.lilypad = this.add.image (470, 25, 'lilypad').setScrollFactor(0);
  this.mushroom = this.add.image (500, 25, 'mushroom').setScrollFactor(0);

  this.flowerNum = this.add.text(415, 20, window.flower, {font: '15px Futura PT Medium', fill: '#ffffff'}).setScrollFactor(0);
  this.herbNum = this.add.text(450, 20, window.herb, {font: '15px Futura PT Medium', fill: '#ffffff'}).setScrollFactor(0);
  this.lilypadNum = this.add.text(485, 20, window.lilypad, {font: '15px Futura PT Medium', fill: '#ffffff'}).setScrollFactor(0);
  this.mushroomNum = this.add.text(515, 20, window.mushroom, {font: '15px Futura PT Medium', fill: '#ffffff'}).setScrollFactor(0);


  //hearts
  this.heart1 = this.add.image (300,25,'heart').setScrollFactor(0).setScale(0.4)
  this.heart2 = this.add.image (330,25,'heart').setScrollFactor(0).setScale(0.4)
  this.heart3 = this.add.image (360,25,'heart').setScrollFactor(0).setScale(0.4)

  if (window.heart === 3) {
    this.heart1.setVisible(true);
    this.heart2.setVisible(true);
    this.heart3.setVisible(true);

} else if (window.heart === 2) {
    this.heart1.setVisible(true);
    this.heart2.setVisible(true);
    this.heart3.setVisible(false);

} else if (window.heart === 1) {
    this.heart1.setVisible(true);
    this.heart2.setVisible(false);
    this.heart3.setVisible(false);

} else if (window.heart === 0) {
    this.heart1.setVisible(false);
    this.heart2.setVisible(false);
    this.heart3.setVisible(false);

}

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

      

        //aesil movement
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

        //winning scene
        if (this.player.x > 914 && this.player .x < 994 && this.player.y > 1079 && this.player.y < 1114) {
          console.log("home location")
          console.log(window.potionGiven)
          if (window.potionGiven > 6) {
            console.log("jumping to winning scene")
            this.scene.start("winningScene")
          }
        }

    


    } // end of update // 

    overlapCrow(player,enemy){
      console.log("***enemyHit")

      //disable enemy after overlap 
      enemy.disableBody(true, true);

      // Play a sound
      this.hitSound.play();

      // shake the screen 
      this.cameras.main.shake(200);

      window.heart--
      console.log("***window.heart")

      enemy.disableBody(false, true);

  
      if (window.heart === 3) {
        this.heart1.setVisible(true);
        this.heart2.setVisible(true);
        this.heart3.setVisible(true);
    
    } else if (window.heart === 2) {
        this.heart1.setVisible(true);
        this.heart2.setVisible(true);
        this.heart3.setVisible(false);
    
    } else if (window.heart === 1) {
        this.heart1.setVisible(true);
        this.heart2.setVisible(false);
        this.heart3.setVisible(false);
    
    } else if (window.heart === 0) {
        this.heart1.setVisible(false);
        this.heart2.setVisible(false);
        this.heart3.setVisible(false);
    
    }

      if (window.heart == 0){
      this.scene.start("deathScene");
      this.deathSound.play();
      }
    }


    overlapCollectible(player,collectible){
      console.log("***itemCollected")

      //disable collectible after overlap 
      collectible.disableBody(false, true);
      window.flower++
      this.flowerNum.setText(window.flower);

      // Play a sound
      this.popSound.play();

      
    }


    overlapCollectible2(player,collectible){
      console.log("***itemCollected")

      //disable collectible after overlap 
      collectible.disableBody(false, true);
      window.herb++
      this.herbNum.setText(window.herb);

      // Play a sound
      this.popSound.play();
    }

    
    overlapCollectible3(player,collectible){
      console.log("***itemCollected")

      //disable collectible after overlap 
      collectible.disableBody(false, true);
      window.lilypad++
      this.lilypadNum.setText(window.lilypad);

      // Play a sound
      this.popSound.play();
    }


    overlapCollectible4(player,collectible){
      console.log("***itemCollected")

      //disable collectible after overlap 
      collectible.disableBody(false, true);
      window.mushroom++
      this.mushroomNum.setText(window.mushroom);

      // Play a sound
      this.popSound.play();
    }



    level2(player){
        console.log("entering witch shop");
        this.scene.start("level2");
    }

    level3(){
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

      moveDownUp3() {
        console.log("moveDownUp3");
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

      moveDownUp6() {
        console.log("moveDownUp6");
        this.tweens.timeline({
          targets: this.crow6,
          ease: "Linear",
          loop: -1, // loop forever
          duration: 3000,
          tweens: [
            {
              y: 1325,
            },
            {
              y: 1549,
            },
          ],
        });
      }

      moveDownUp10() {
        console.log("moveDownUp10");
        this.tweens.timeline({
          targets: this.crow10,
          ease: "Linear",
          loop: -1, // loop forever
          duration: 3000,
          tweens: [
            {
              y: 1648,
            },
            {
              y: 1549,
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

      moveRightLeft4() {
        console.log("moveRightLeft4");
        this.tweens.timeline({
          targets: this.crow4,
          loop: -1, // loop forever
          ease: "Linear",
          duration: 2000,
          tweens: [
            {
              x: 1530,
            },
            {
              x: 1357,
            },
          ],
        });
      }

      moveRightLeft5() {
        console.log("moveRightLeft5");
        this.tweens.timeline({
          targets: this.crow5,
          loop: -1, // loop forever
          ease: "Linear",
          duration: 2000,
          tweens: [
            {
              x: 1424,
            },
            {
              x: 1744,
            },
          ],
        });
      }

      moveRightLeft7() {
        console.log("moveRightLeft7");
        this.tweens.timeline({
          targets: this.crow7,
          loop: -1, // loop forever
          ease: "Linear",
          duration: 2000,
          tweens: [
            {
              x: 1234,
            },
            {
              x: 722,
            },
          ],
        });
      }

      moveRightLeft8() {
        console.log("moveRightLeft8");
        this.tweens.timeline({
          targets: this.crow8,
          loop: -1, // loop forever
          ease: "Linear",
          duration: 2000,
          tweens: [
            {
              x: 912,
            },
            {
              x: 791,
            },
          ],
        });
      }

      moveRightLeft9() {
        console.log("moveRightLeft9");
        this.tweens.timeline({
          targets: this.crow9,
          loop: -1, // loop forever
          ease: "Linear",
          duration: 2000,
          tweens: [
            {
              x: 397,
            },
            {
              x: 304,
            },
          ],
        });
      }

      

      giveHealthPotion(player,npc){
        console.log("***givenPotion")
        this.add.sprite(this.npc1.x+50, this.npc1.y, 'healthpotion').play("healthpotionshake")
        player.x = this.npc1.x+90
        window.potionGiven++
        console.log(window.potionGiven)
      }

      giveLuckPotion(player,npc){
        console.log("***givenPotion")
        this.add.sprite(this.npc2.x+50, this.npc2.y, 'luckpotion').play("luckpotionshake")
        player.x = this.npc2.x+90
        window.potionGiven++
        console.log(window.potionGiven)
      }

      giveProsperityPotion(){
        console.log("***givenPotion")
        this.add.sprite(this.redmagician.x+50, this.redmagician.y, 'prosperitypotion').play("prosperitypotionshake")
        player.x = this.redmagician.x+90
        window.potionGiven++
        console.log(window.potionGiven)
      }



      updateInventory() {
        console.log("*** updateInventory()")
        // Emit events showInventory
        this.inventory = {}
        this.inventory.flower = window.flower
        this.inventory.herb = window.herb
        this.inventory.lilypad = window.lilypad
        this.inventory.mushroom = window.mushroom
        this.inventory.heart = window.heart
         
        console.log('*** updateInventory() Emit event', this.inventory)
        this.invEvent = (event, data) =>  { this.scene.get('inventory').events.emit(event, data); }
        this.invEvent("inventory", this.inventory);
      }
}