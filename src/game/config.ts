import { BootScene } from './scenes/boot-scene';
import { GameScene } from './scenes/game-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Space Shooter',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '1.0.0',
  width: 640,
  height: 480,
  backgroundColor: 0x0,
  type: Phaser.CANVAS,
  pixelArt: true,
  antialias: false,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
        fps: 60,
        gravity: { y: 0 }
    }
  },
  scene: [BootScene, GameScene]
};