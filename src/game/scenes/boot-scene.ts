import { loadFont } from "../lib/load-font";

export class BootScene extends Phaser.Scene {
  private loadingBar!: Phaser.GameObjects.Graphics;
  private progressBar!: Phaser.GameObjects.Graphics;

  constructor() {
    super({
      key: 'BootScene'
    });
  }

  preload(): void {
      
    // set the background and create loading bar
    this.cameras.main.setBackgroundColor(0x000000);
    this.createLoadingbar();

    // pass value to change the loading bar fill
    this.load.on(
      'progress',
       (value: number) => {
          console.log('progress this', this)
        this.progressBar.clear();
        this.progressBar.fillStyle(0xfff6d3, 1);
        this.progressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 16,
          (this.cameras.main.width / 2) * value,
          16
        );
      },
      this
    );

    // delete bar graphics, when loading complete
    this.load.on(
      'complete',
       () => {
        this.progressBar.destroy();
        this.loadingBar.destroy();
      },
      this
    );

    // @ts-ignore
    this.load.rexAwait(async(successCallback, failureCallback) => {
        try {
            await loadFont('PressStart2P', 'https://fonts.gstatic.com/s/pressstart2p/v14/e3t4euO8T-267oIAQAu6jDQyK3nVivNm4I81.woff2')
            successCallback();
        } catch(e) {
            failureCallback(e)
        }
    });
    this.load.spritesheet('player', '/images/fighter.png', { frameWidth: 27, frameHeight: 32 });
    this.load.spritesheet('enemy-mine', '/images/mine.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('background-level1', '/images/level1.png');
  }

  update(): void {
    this.scene.start('GameScene');
  }

  private createLoadingbar(): void {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0xffffff, 1);
    this.loadingBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }
}