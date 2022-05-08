import { BootScene } from './scenes/boot-scene';
import { GameScene } from './scenes/game-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'RapRap',
  url: 'https://github.com/kyr0/RapRap',
  version: '0.0.1',
  width: 640,
  height: 480,
  backgroundColor: 0x0,
  scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 640,
      height: 480
  },
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