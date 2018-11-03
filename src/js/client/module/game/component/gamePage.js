import React, { Component } from 'react';
import Phaser from 'phaser';
import GameScene from '../../../game/scenes/gameScene';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      game: {},
=======
      w: 600,
      h: 600, // initial app dimention values (temp state before onResize handler will be called after componentDidMount)
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e
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
      scene: [GameScene],
    };

    // let game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
<<<<<<< HEAD
    this.setState({ game: new Phaser.Game(config) });
  }

  componentWillUnmount() {
    const { game } = this.state;
    game.destroy(true);
=======
    const game = new Phaser.Game(config);
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e
  }

  componentDidCatch(error, info) {
    console.warn(error, info);
  }

  render() {
    return <div />;
  }
}

export default Game;
