import { direction as spriteDirection } from '../../../enum/direction';
import { getInitialCoordinates, getPlayers } from '../logic/playerLogic';

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene',
    });
    this.socketManager = null;
    this.currentPlayer = null;
    this.enemy = {};
    this.players = null;
    this.gameOver = false;
    this.isMoving = false;

    this.updatePlayerCoordinates = this.updatePlayerCoordinates.bind(this);
    this.stopPlayer = this.stopPlayer.bind(this);
    this.updateEnemyCoordinates = this.updateEnemyCoordinates.bind(this);
  }

  // faceNextTile() {
  //   const isVerticalMovement = Math.abs(this.players[this.currentPlayer.id].sprite.y - this.enemy.y) < 100
  //     || Math.abs(this.enemy.y - this.players[this.currentPlayer.id].sprite.y) < 100;
  //   if (isVerticalMovement) {
  //     if (this.players[this.currentPlayer.id].sprite.x > this.enemy.x) {
  //       this.enemy.anims.play(`monster_${spriteDirection.right}`, false);
  //     } else {
  //       this.enemy.anims.play(`monster_${spriteDirection.left}`, true);
  //     }
  //   } else if (this.players[this.currentPlayer.id].sprite.y > this.enemy.y) {
  //     this.enemy.anims.play(`monster_${spriteDirection.down}`, true);
  //   } else {
  //     this.enemy.anims.play(`monster_${spriteDirection.up}`, true);
  //   }
  // }

  // collectStar(player, star) {
  //   star.disableBody(true, true);

  //   //  Add and update the score
  //   score += 10;
  //   scoreText.setText(`Score: ${score}`);

  //   if (stars.countActive(true) === 0) {
  //     //  A new batch of stars to collect
  //     stars.children.iterate((child) => {
  //       child.enableBody(true, child.x, 0, true, true);
  //     });

  //     const x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

  //     const bomb = bombs.create(x, 16, 'bomb');
  //     bomb.setBounce(1);
  //     bomb.setCollideWorldBounds(true);
  //     bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  //     bomb.allowGravity = false;
  //   }
  // }

  enemyCatch() {
    this.physics.pause();

    this.players[this.currentPlayer.id].sprite.setTint(0xff0000);

    this.players[this.currentPlayer.id].sprite.anims.play('player_immobile');
    this.enemy.sprite.anims.play('enemy_immobile');
    this.enemy.sprite.setVelocity(0);
    this.gameOver = true;

    this.add.text(30, 30, 'Gamer over', {
      fontSize: '32px',
      fontWeight: 'bold',
      fill: '#FF0000',
    });
  }

  addPlayer(playerId, position, layer) {
    const initialCoordinates = getInitialCoordinates(position);
    this.players[playerId].sprite = this.physics.add.sprite(
      initialCoordinates.x,
      initialCoordinates.y,
      'players',
    );

    /* TEST */
    this.players[playerId].sprite.scaleX = 0.7;
    this.players[playerId].sprite.scaleY = 0.7;
    /* */
    this.physics.add.collider(this.players[playerId].sprite, layer);
    this.players[playerId].sprite.setCollideWorldBounds(true);
    this.physics.add.collider(
      this.players[playerId].sprite,
      this.enemy.sprite,
      this.enemyCatch,
      null,
      this,
    );
    this.players[playerId].nicknameSprite = this.add.text(
      this.players[playerId].sprite.x - 50,
      this.players[playerId].sprite.y - 50,
      this.players[playerId].nickname,
      {
        fontFamily: 'Arial',
        fontSize: '15px',
        fontWeight: 'bold',
        // backgroundColor: '#FFFFFF',
        shadowStroke: true,
        // shadowColor: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: '2',
        maxLines: 1,
        color: this.colorByPlayer[playerId],
      },
    );
  }

  init(data) {
    // Init the data
    const {
      socketManager, gameId, currentPlayer, players, colorByPlayer,
    } = data;
    this.socketManager = socketManager;
    this.gameId = gameId;
    this.currentPlayer = currentPlayer;
    this.players = getPlayers(players);
    this.colorByPlayer = colorByPlayer;
  }

  preload() {
    this.load.image('sky', '/assets/sky.png');
    this.load.image('ground', '/assets/platform.png');
    this.load.image('star', '/assets/star.png');
    this.load.image('bomb', '/assets/bomb.png');
    this.load.image('tiles1', '/assets/tilemaps/tilesets/Bokou_Steampunk_sols_murs.png');
    this.load.image('tiles2', '/assets/tilemaps/tilesets/sols_murs.png');
    this.load.image('tiles3', '/assets/tilemaps/tilesets/PandaMaru_MV_nobleinterior.png');
    this.load.tilemapTiledJSON('map', '/assets/tilemaps/main.json');

    // Characters sprite sheet
    this.load.spritesheet('players', '/assets/spritesheets/playable_characters.png', {
      frameWidth: 48,
      frameHeight: 48,
    });

    // Enemy sprite sheet
    this.load.spritesheet('enemy', '/assets/spritesheets/armored_monster.png', {
      frameWidth: 43,
      frameHeight: 64,
    });
  }

  create() {
    //     // Load a blank map with a 32 x 32 px tile size. This is the base tile size. This means that
    // // tiles in the map will be placed on a 32 x 32 px grid.
    // var map = this.make.tilemap({ width: 200, height: 200, tileWidth: 32, tileHeight: 32 });
    // // You can also change the base tile size of map like this:
    // // map.setBaseTileSize(32, 32);
    // // Load a 32 x 64 px tileset. This tileset was designed to allow tiles to overlap vertically, so
    // // placing them on a 32 x 32 grid is exactly what we want.
    // var tiles = map.addTilesetImage('walls_1x2', null, 32, 64);

    const map = this.make.tilemap({ key: 'map' });

    // The first parameter is the name of the tileset in Tiled and the second parameter is the key
    // of the tileset image used when loading the file in preload.
    const tiles1 = map.addTilesetImage('Bokou_Steampunk_sols_murs', 'tiles1');
    const tiles2 = map.addTilesetImage('sols_murs', 'tiles2');
    const tiles3 = map.addTilesetImage('PandaMaru_MV_nobleinterior', 'tiles3');

    // You can load a layer from the map using the layer name from Tiled, or by using the layer
    // index (0 in this case).
    const layer1 = map.createStaticLayer('walls', tiles1, 0, 0);
    const layer2 = map.createStaticLayer('ground', tiles2, 0, 0);
    const layer3 = map.createStaticLayer('noble_fournitures', tiles3, 0, 0);

    // Configure the non walkable tiles
    // layer.setCollisionByProperty({ collides: true }); // doesnt work anymore
    // layer.setCollisionBetween(16, 52); // Disabled for testing purpose

    // Create the enemy
    this.enemy.sprite = this.physics.add.sprite(300, 500, 'enemy');

    // Create the players
    Object.keys(this.players).forEach(id => this.addPlayer(this.players[id].id, this.players[id].position, layer1));

    this.enemy.sprite.setCollideWorldBounds(true);

    // this.physics.add.collider(this.enemy.sprite, layer);

    // map size
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cameras.main.startFollow(this.players[this.currentPlayer.id].sprite);
    this.cameras.main.zoom = 2;

    this.cameras.main.followOffset.set(0, 0);

    // Player animations
    this.anims.create({
      key: `player_${spriteDirection.left}`,
      frames: this.anims.generateFrameNumbers('players', { start: 12, end: 14 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'player_immobile',
      frames: [{ key: 'players', frame: 1 }],
      frameRate: 20,
    });

    this.anims.create({
      key: `player_${spriteDirection.right}`,
      frames: this.anims.generateFrameNumbers('players', { start: 24, end: 26 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: `player_${spriteDirection.up}`,
      frames: this.anims.generateFrameNumbers('players', { start: 36, end: 38 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: `player_${spriteDirection.down}`,
      frames: this.anims.generateFrameNumbers('players', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });

    // Monster animations
    this.anims.create({
      key: `enemy_${spriteDirection.left}`,
      frames: this.anims.generateFrameNumbers('enemy', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'enemy_immobile',
      frames: [{ key: 'enemy', frame: 2 }],
      frameRate: 20,
    });

    this.anims.create({
      key: `enemy_${spriteDirection.right}`,
      frames: this.anims.generateFrameNumbers('enemy', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: `enemy_${spriteDirection.up}`,
      frames: this.anims.generateFrameNumbers('enemy', {
        start: 12,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: `enemy_${spriteDirection.down}`,
      frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.removeKey('SPACE'); // Unbind the space bar because it is used by the chat

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    // stars = this.physics.add.group({
    //     key: 'star',
    //     repeat: 11,
    //     setXY: { x: 12, y: 0, stepX: 70 }
    // });

    // stars.children.iterate(function (child) {

    //     //  Give each star a slightly different bounce
    //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    // });

    // const bombs = this.physics.add.group();

    // //  The score
    // const scoreText = this.add.text(16, 16, 'score: 0', {
    //   fontSize: '32px',
    //   fill: '#000',
    // });

    //  Collide the player and the monster
    // this.physics.add.collider(player, monster);
    // this.physics.add.collider(stars, platforms);
    // this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    // this.physics.add.overlap(player, stars, collectStar, null, this);

    // let test = 300;
    // this.time.addEvent({
    //   delay: 100,
    //   callback: () => this.updateEnemyCoordinates({ x: test += 8, y: 400, direction: 4 }),
    //   callbackScope: this,
    //   loop: true,
    // });

    this.socketManager.registerEnemyCoordinatesReceived(this.updateEnemyCoordinates);
    this.socketManager.registerPlayerCoordinatesReceived(this.updatePlayerCoordinates);
    this.socketManager.registerPlayerStopReceived(this.stopPlayer);
  }

  updatePlayerCoordinates({ playerId, coordinatesData }) {
    console.log('updatePlayerCoordinates', { playerId, coordinatesData });
    this.players[playerId].sprite.x = coordinatesData.x;
    this.players[playerId].sprite.y = coordinatesData.y;
    this.players[playerId].nicknameSprite.x = coordinatesData.x - 50;
    this.players[playerId].nicknameSprite.y = coordinatesData.y - 50;
    this.players[playerId].sprite.anims.play(`player_${coordinatesData.direction}`, true);
  }

  stopPlayer({ playerId, coordinatesData }) {
    this.players[playerId].sprite.x = coordinatesData.x;
    this.players[playerId].sprite.y = coordinatesData.y;
    this.players[playerId].nicknameSprite.x = coordinatesData.x - 50;
    this.players[playerId].nicknameSprite.y = coordinatesData.y - 50;
    this.players[playerId].sprite.anims.play('player_immobile', true);
  }

  updateEnemyCoordinates({ x, y, direction }) {
    // TECH 1
    this.enemy.sprite.setVelocity(0);
    // switch (direction) {
    //   case spriteDirection.down:
    //     this.enemy.sprite.setVelocityY(160);
    //     break;
    //   case spriteDirection.up:
    //     this.enemy.sprite.setVelocityY(-160);
    //     break;
    //   case spriteDirection.right:
    //     this.enemy.sprite.setVelocityX(160);
    //     break;
    //   case spriteDirection.left:
    //     this.enemy.sprite.setVelocityX(-160);
    //     break;
    //   default:
    //     throw new Error('Error with the given direction');
    // }

    // TECH 2
    // this.enemy.sprite.x = x;
    // this.enemy.sprite.y = y;

    // TECH 3
    this.tweens.add({
      targets: this.enemy.sprite,
      props: {
        x: { value: x },
        y: { value: y },
      },
      duration: 200,
    });

    this.enemy.sprite.anims.play(`enemy_${direction}`, true);
  }

  update() {
    this.players[this.currentPlayer.id].sprite.setVelocity(0);

    if (this.gameOver) {
      return;
    }

    if (this.cursors.space.isDown) {
      console.log('SPACE');
    }

    if (this.cursors.up.isDown) {
      this.players[this.currentPlayer.id].sprite.setVelocityY(-160);

      this.players[this.currentPlayer.id].sprite.anims.play(`player_${spriteDirection.up}`, true);
      this.players[this.currentPlayer.id].nicknameSprite.x = this.players[this.currentPlayer.id].sprite.x - 50;
      this.players[this.currentPlayer.id].nicknameSprite.y = this.players[this.currentPlayer.id].sprite.y - 50;
      this.socketManager.sendCurrentPlayerCoordinates({
        gameId: this.gameId,
        coordinatesData: {
          direction: spriteDirection.up,
          x: this.players[this.currentPlayer.id].sprite.x,
          y: this.players[this.currentPlayer.id].sprite.y,
        },
      });
      this.isMoving = true;
    } else if (this.cursors.down.isDown) {
      this.players[this.currentPlayer.id].sprite.setVelocityY(160);
      this.players[this.currentPlayer.id].sprite.anims.play(`player_${spriteDirection.down}`, true);
      this.players[this.currentPlayer.id].nicknameSprite.x = this.players[this.currentPlayer.id].sprite.x - 50;
      this.players[this.currentPlayer.id].nicknameSprite.y = this.players[this.currentPlayer.id].sprite.y - 50;
      this.socketManager.sendCurrentPlayerCoordinates({
        gameId: this.gameId,
        coordinatesData: {
          direction: spriteDirection.down,
          x: this.players[this.currentPlayer.id].sprite.x,
          y: this.players[this.currentPlayer.id].sprite.y,
        },
      });
      this.isMoving = true;
    } else if (this.cursors.left.isDown) {
      this.players[this.currentPlayer.id].sprite.setVelocityX(-160);
      this.players[this.currentPlayer.id].sprite.anims.play(`player_${spriteDirection.left}`, true);
      this.players[this.currentPlayer.id].nicknameSprite.x = this.players[this.currentPlayer.id].sprite.x - 50;
      this.players[this.currentPlayer.id].nicknameSprite.y = this.players[this.currentPlayer.id].sprite.y - 50;
      this.socketManager.sendCurrentPlayerCoordinates({
        gameId: this.gameId,
        coordinatesData: {
          direction: spriteDirection.left,
          x: this.players[this.currentPlayer.id].sprite.x,
          y: this.players[this.currentPlayer.id].sprite.y,
        },
      });
      this.isMoving = true;
    } else if (this.cursors.right.isDown) {
      this.players[this.currentPlayer.id].sprite.setVelocityX(160);
      this.players[this.currentPlayer.id].sprite.anims.play(
        `player_${spriteDirection.right}`,
        true,
      );
      this.players[this.currentPlayer.id].nicknameSprite.x = this.players[this.currentPlayer.id].sprite.x - 50;
      this.players[this.currentPlayer.id].nicknameSprite.y = this.players[this.currentPlayer.id].sprite.y - 50;
      this.socketManager.sendCurrentPlayerCoordinates({
        gameId: this.gameId,
        coordinatesData: {
          direction: spriteDirection.right,
          x: this.players[this.currentPlayer.id].sprite.x,
          y: this.players[this.currentPlayer.id].sprite.y,
        },
      });
      this.isMoving = true;
    }

    if (
      !this.cursors.left.isDown
      && !this.cursors.right.isDown
      && !this.cursors.up.isDown
      && !this.cursors.down.isDown
    ) {
      this.players[this.currentPlayer.id].sprite.body.velocity.x = 0;
      this.players[this.currentPlayer.id].sprite.body.velocity.y = 0;
      this.players[this.currentPlayer.id].sprite.anims.play('player_immobile', true);
      this.players[this.currentPlayer.id].nicknameSprite.x = this.players[this.currentPlayer.id].sprite.x - 50;
      this.players[this.currentPlayer.id].nicknameSprite.y = this.players[this.currentPlayer.id].sprite.y - 50;
      this.socketManager.sendCurrentPlayerStop({
        gameId: this.gameId,
        coordinatesData: {
          x: this.players[this.currentPlayer.id].sprite.x,
          y: this.players[this.currentPlayer.id].sprite.y,
        },
      });
      this.isMoving = false;
    }

    // if (cursors.up.isDown && player.body.touching.down)
    // {
    //     player.setVelocityY(-330);
    // }
  }
}
export default GameScene;
