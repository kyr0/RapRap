import { Player } from '../objects/player';

export class GameScene extends Phaser.Scene {
  private player!: Player;
  private bg!: Phaser.GameObjects.TileSprite;

  private enemyGroup!: Phaser.GameObjects.Group;
  private mine!: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {

    // level background
    this.bg = this.add.tileSprite(0, 0, 288, 4928, 'background-level1', 'level1');
    this.bg.setScale(4.5)

    // stats
    this.data.set('respawns', 3);
    this.data.set('level', 1);
    this.data.set('score', 0);

    const text = this.add.text(8, 8, '', { font: '16px PressStart2P', color: '#cc0000' });
    text.setText([
        'Level: ' + this.data.get('level'),
        'Respawns: ' + this.data.get('respawns'),
        'Score: ' + this.data.get('score')
    ]);

    // spaceship
    this.player = new Player({
      scene: this,
      x: 320,
      y: this.game.canvas.height - 48,
      texture: 'player',
      frame: 2
    });

    this.anims.create({
        key: 'mine-blink',
        duration: 2000,
        frames: this.anims.generateFrameNumbers('enemy-mine', { start: 0, end: 1 }),
        frameRate: 2,
        repeat: -1
    });

    // enemies
    this.enemyGroup = this.add.group();
    this.mine = this.enemyGroup.create(200, 0, 'enemy-mine')
    this.mine.setScale(2)
    this.physics.world.enableBody(this.mine)
    //mine.anchor.set(0.5, 0.5);
    //this.enemyGroup.add(mine)

    console.log('this.mine', this.mine)
    this.enemyGroup.scene.anims.play('mine-blink', this.mine);
  }

  update(): void {
    this.player.update();

    this.physics.collide(this.player, this.mine, () => {
        console.log('collided')

        this.mine.destroy()
    });
    
    if (this.mine && this.mine.active) {
        this.mine.body.velocity.y = 0.5 * 100;
    }
    // vertical scrolling
    this.bg.setTilePosition(
        0,
        this.bg.tilePositionY - 0.25
    )
  }
}