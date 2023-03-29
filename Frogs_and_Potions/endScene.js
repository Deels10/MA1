class endScene extends Phaser.Scene {

    constructor ()
    {
        super('endScene');
    }

    create ()
    {
        let graphics = this.add.graphics();

        graphics.fillStyle(0xffcc33, 1);

        graphics.fillRect(100, 200, 600, 300);
        graphics.fillRect(300, 100, 100, 100);

        this.add.text(320, 110, 'C', { font: '96px Courier', fill: '#000000' });
        // this.add.text(120, 310, 'Press 2 to enter witch shop', { font: '24px Courier', fill: '#000000' });
        // this.add.text(120, 350, 'Press 3 to go to marketplace', { font: '24px Courier', fill: '#000000' });
        // this.add.text(120, 350, 'Press 4 to enter secret garden', { font: '24px Courier', fill: '#000000' });

        // var key1 = this.input.keyboard.addKey('1');
        // var key2 = this.input.keyboard.addKey('2');
        // var key3 = this.input.keyboard.addKey('3');
        
        // key1.on('down', function(){
        // console.log("witch shop");
        //     this.scene.start("level2");
        // }, this );

        // key2.on('down', function(){
        //     console.log("marketplace");
        //     this.scene.start("level3");
        //     }, this );

        // key3.on('down', function(){
        // console.log("secret garden");
        // this.scene.start("level4");
        // }, this );

    }
}
