import 'Phaser';
import AwaitLoaderPlugin from 'phaser3-rex-plugins/plugins/awaitloader-plugin.js';

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super({
        plugins: {
            global: [
                {
                    key: 'rexAwaitLoader',
                    plugin: AwaitLoaderPlugin,
                    start: true,
                },
            ],
        },
        ...config,
    });
  }
}