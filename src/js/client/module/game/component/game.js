import React, { Component } from 'react';
import Phaser from 'phaser';
import GameScene from '../../../game/scenes/gameScene';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {},
    };
  }

  componentDidMount() {
    const config = {
      type: Phaser.AUTO,
      // width: 500,
      // height: 500,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      parent: 'game-container',
    };
    this.setState({ game: new Phaser.Game(config) }, () => {
      const { game } = this.state;
      const { socketManager, gameId } = this.props;
      game.scene.add('GameScene', GameScene, false);
      game.scene.start('GameScene', { socketManager, gameId });
    });
  }

  componentWillUnmount() {
    const { game } = this.state;
    game.destroy(true);
  }

  componentDidCatch(error, info) {
    console.warn(error, info);
  }

  render() {
    return <div id="game-container" />;
  }
}

export default Game;
