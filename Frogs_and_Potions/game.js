
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false //make sure to turn it false
        }
    },

    backgroundColor: '#000000',
    scene: [preloadScene, openingScene, instructionsScene, level1, level2, level3, level4, deathScene, winningScene]
};


let game = new Phaser.Game(config);
window.flower = 0
window.herb = 0
window.lilypad = 0
window.mushroom = 0
window.heart = 3;

window.potionGiven = 0