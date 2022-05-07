import { IImageConstructor } from '../interfaces/image.interface';
import { Bullet } from './bullet';

export class Player extends Phaser.GameObjects.Sprite {

  private bullets!: Bullet[];
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private isShooting!: boolean;
  private shootKey!: Phaser.Input.Keyboard.Key;
  private leftFlag: boolean = false
  private rightFlag: boolean = false

  public getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }

  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    this.initImage();
    this.initVariables();
    this.initInput();
    this.initPhysics();
    this.scene.add.existing(this);
    this.initAnims();
  }

  private initAnims(): void {
    this.anims.create({
        key: 'move-right',
        duration: 50,
        frames: this.anims.generateFrameNumbers('player', { start: 2, end: 4 }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'move-left',
        duration: 50,
        frames: this.anims.generateFrameNumbers('player', { start: 2, end: 0 }),
        frameRate: 20,
        repeat: 0
    });
  }

  private initImage(): void {
    this.setScale(2);
  }

  private initVariables(): void {
    this.bullets = [];
    this.isShooting = false;
  }

  private initInput(): void {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.shootKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.getBody().setDamping(true);
    this.getBody().setDrag(0.99, 0.99);
    this.getBody().setMaxVelocity(300);
  }

  update(): void {

    if (this.active) {
      this.handleInput();
    }
    this.updateBullets();
    this.scene.physics.world.wrap(this.getBody(), 16);
  }

  public getDefaultYPosition() {
      return this.scene.game.canvas.height - 48
  }

  private handleInput(): void {
    // shooting
    if (this.shootKey.isDown && !this.isShooting) {
      this.doubleShoot();
      this.isShooting = true;
    }

    // stop shooting
    if (this.shootKey.isUp) {
      this.isShooting = false;
    }

    if (this.cursors.up.isDown) {
        this.setY(this.y - 4)
        if (this.y <= 30) {
            this.setY(30)
        }
    } else if (this.cursors.down.isDown) {
        this.setY(this.y + 4)
        if (this.y >= this.getDefaultYPosition()) {
            this.setY(this.getDefaultYPosition())
        }
    }
    if (this.cursors.left.isDown) {
        this.rightFlag = false;
        this.setX(this.x - 4)

        if (!this.leftFlag) {
            this.anims.play('move-left');
        }
        this.leftFlag = true;
    } else if (this.cursors.right.isDown) {
        this.leftFlag = false;
        this.setX(this.x + 4)
        if (!this.rightFlag) {
            this.anims.play('move-right');
        }
        this.rightFlag = true;
    } else {
        this.leftFlag = false;
        this.rightFlag = false;
        this.setFrame(2)
    }
  }

  private doubleShoot(): void {
    this.bullets.push(
      new Bullet({
        scene: this.scene,
        rotation: this.rotation,
        options: {
          x: this.x + Math.cos(this.rotation) * 20,
          y: this.y + Math.sin(this.rotation) * 20
        }
      }),
      new Bullet({
        scene: this.scene,
        rotation: this.rotation,
        options: {
          x: this.x - Math.cos(this.rotation) * 20,
          y: this.y - Math.sin(this.rotation) * 20
        }
      })
    );
  }

  private updateBullets(): void {
    for (let i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].active) {
        this.bullets[i].update();
      } else {
        this.bullets[i].destroy();
        this.bullets.splice(i, 1);
      }
    }
  }
}