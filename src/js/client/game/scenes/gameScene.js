import EasyStar from 'easystarjs';
import { direction as spriteDirection } from '../../../enum/direction';
import { getInitialCoordinates, getPlayers } from '../logic/playerLogic';

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene',
    });
    this.socketManager = null;
    this.currentPlayer = null;
    this.players = null;
    this.gameOver = false;
    this.isMoving = false;

    this.updatePlayerCoordinates = this.updatePlayerCoordinates.bind(this);
    this.stopPlayer = this.stopPlayer.bind(this);
  }

  faceNextTile() {
    const isVerticalMovement = Math.abs(this.players[this.currentPlayer.id].sprite.y - this.monster.y) < 100
      || Math.abs(this.monster.y - this.players[this.currentPlayer.id].sprite.y) < 100;
    if (isVerticalMovement) {
      if (this.players[this.currentPlayer.id].sprite.x > this.monster.x) {
        this.monster.anims.play(`monster_${spriteDirection.right}`, false);
      } else {
        this.monster.anims.play(`monster_${spriteDirection.left}`, true);
      }
    } else if (this.players[this.currentPlayer.id].sprite.y > this.monster.y) {
      this.monster.anims.play(`monster_${spriteDirection.down}`, true);
    } else {
      this.monster.anims.play(`monster_${spriteDirection.up}`, true);
    }
  }

  calculAIAndMove() {
    const that = this;
    // Monster go to player
    this.finder.findPath(
      Math.floor(this.monster.x / 32),
      Math.floor(this.monster.y / 32),
      Math.floor(this.players[this.currentPlayer.id].sprite.x / 32),
      Math.floor(this.players[this.currentPlayer.id].sprite.y / 32),
      (path) => {
        if (path === null) {
          // console.warn("Path was not found.");
        } else {
          // console.log(path);
          // Move character
          // Sets up a list of tweens, one for each tile to walk, that will be chained by the timeline
          const tweens = [];
          for (let i = 0; i < path.length - 1; i++) {
            const ex = path[i + 1].x;
            const ey = path[i + 1].y;
            tweens.push({
              targets: that.monster,
              x: { value: ex * 32, duration: 200 },
              y: { value: ey * 32, duration: 200 },
              onStart: that.faceNextTile.bind(that),
            });
          }
          that.tweens.killAll();
          that.tweens.timeline({
            tweens,
          });
        }
      },
    );
    this.finder.calculate();
  }

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

  monsterCatch() {
    this.physics.pause();

    this.players[this.currentPlayer.id].sprite.setTint(0xff0000);

    this.players[this.currentPlayer.id].sprite.anims.play('playerImmobile');
    this.monster.anims.play('monsterImmobile');

    this.gameOver = true;

    this.add.text(30, 30, 'Gamer over', {
      fontSize: '32px',
      fontWeight: 'bold',
      fill: '#FF0000',
    });
  }

  getTileID(map, x, y) {
    const tile = map.getTileAt(x, y);
    return tile.index;
  }

  addPlayer(playerId, position, layer) {
    const initialCoordinates = getInitialCoordinates(position);
    this.players[playerId].sprite = this.physics.add.sprite(
      initialCoordinates.x,
      initialCoordinates.y,
      'all',
    );
    this.physics.add.collider(this.players[playerId].sprite, layer);
    this.players[playerId].sprite.setCollideWorldBounds(true);
    this.physics.add.collider(
      this.players[playerId].sprite,
      this.monster,
      this.monsterCatch,
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
        //backgroundColor: '#FFFFFF',
        shadowStroke: true,
        //shadowColor: '#FFFFFF',
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
    this.load.image('tiles', '/assets/tilemaps/tiles/main.png');
    this.load.tilemapTiledJSON('map', '/assets/tilemaps/maps/main.json');

    // Characters sprite sheet
    this.load.spritesheet('all', '/assets/spritesheets/all.jpg', {
      frameWidth: 48,
      frameHeight: 48,
    });

    // Monster sprite sheet
    this.load.spritesheet('monster', '/assets/spritesheets/armored_monster.png', {
      frameWidth: 43,
      frameHeight: 64,
    });
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });

    // The first parameter is the name of the tileset in Tiled and the second parameter is the key
    // of the tileset image used when loading the file in preload.
    const tiles = map.addTilesetImage('main', 'tiles');

    // You can load a layer from the map using the layer name from Tiled, or by using the layer
    // index (0 in this case).
    const layer = map.createStaticLayer(0, tiles, 0, 0);

    // Set colliding tiles before converting the layer to Matter bodies!
    layer.setCollisionByProperty({ collides: true });

    // Convert the layer. Any colliding tiles will be given a Matter body. If a tile has collision
    // shapes from Tiled, these will be loaded. If not, a default rectangle body will be used. The
    // body will be accessible via tile.physics.matterBody.
    // this.arcade.world.convertTilemapLayer(layer);

    //  A simple background for our game
    // this.add.image(0, 0, 'sky').setScale(1500,1500).setOrigin(0);;

    //  The platforms group contains the ground and the 2 ledges we can jump on
    // platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    // platforms.create(3000, 10, 'ground').setScale(10).refreshBody();

    //  Now let's create some ledges
    // platforms.create(20, 10, 'ground');
    // platforms.create(50, 270, 'ground');
    // platforms.create(800, 250, 'ground');

    // Create the monster
    this.monster = this.physics.add.sprite(300, 400, 'monster');

    // Create the players
    Object.keys(this.players).forEach(id => this.addPlayer(this.players[id].id, this.players[id].position, layer));

    //  Player physics properties. Give the little guy a slight bounce.
    // player.setBounce(0.5);

    this.monster.setCollideWorldBounds(true);

    this.physics.add.collider(this.monster, layer);

    // this.physics.world.setBounds(0, 0, 1500, 1500);
    // this.cameras.main.setBounds(0, 0, 1500, 1500);

    // map size
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cameras.main.startFollow(this.players[this.currentPlayer.id].sprite);

    this.cameras.main.followOffset.set(0, 0);

    // Pathfinding
    this.finder = new EasyStar.js();

    const grid = [];
    for (let y = 0; y < map.height; y++) {
      const col = [];
      for (let x = 0; x < map.width; x++) {
        // In each cell we store the ID of the tile, which corresponds
        // to its index in the tileset of the map ("ID" field in Tiled)
        col.push(this.getTileID(map, x, y));
      }
      grid.push(col);
    }
    this.finder.setGrid(grid);

    const tileset = map.tilesets[0];
    const properties = tileset.tileProperties;
    const acceptableTiles = [];

    for (let i = tileset.firstgid - 1; i < tiles.total; i++) {
      // firstgid and total are fields from Tiled that indicate the range of IDs that the tiles can take in that tileset
      if (!properties.hasOwnProperty(i)) {
        // If there is no property indicated at all, it means it's a walkable tile
        acceptableTiles.push(i + 1);
        continue;
      }
      if (!properties[i].collides) acceptableTiles.push(i + 1);
      // if(properties[i].cost) Game.finder.setTileCost(i+1, properties[i].cost); // If there is a cost attached to the tile, let's register it
    }
    this.finder.setAcceptableTiles(acceptableTiles);

    // Player animations
    this.anims.create({
      key: `player_${spriteDirection.left}`,
      frames: this.anims.generateFrameNumbers('all', { start: 69, end: 71 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'player_immobile',
      frames: [{ key: 'all', frame: 58 }],
      frameRate: 20,
    });

    this.anims.create({
      key: `player_${spriteDirection.right}`,
      frames: this.anims.generateFrameNumbers('all', { start: 81, end: 83 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: `player_${spriteDirection.up}`,
      frames: this.anims.generateFrameNumbers('all', { start: 93, end: 95 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: `player_${spriteDirection.down}`,
      frames: this.anims.generateFrameNumbers('all', { start: 57, end: 59 }),
      frameRate: 10,
      repeat: -1,
    });

    // Monster animations
    this.anims.create({
      key: `monster_${spriteDirection.left}`,
      frames: this.anims.generateFrameNumbers('monster', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'monsterImmobile',
      frames: [{ key: 'monster', frame: 2 }],
      frameRate: 20,
    });

    this.anims.create({
      key: `monster_${spriteDirection.right}`,
      frames: this.anims.generateFrameNumbers('monster', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: `monster_${spriteDirection.up}`,
      frames: this.anims.generateFrameNumbers('monster', {
        start: 12,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: `monster_${spriteDirection.down}`,
      frames: this.anims.generateFrameNumbers('monster', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

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

    // const recalculAIEvent = this.time.addEvent({
    //   delay: 1000,
    //   callback: this.calculAIAndMove,
    //   callbackScope: this,
    //   loop: true,
    // });

    this.socketManager.registerPlayerCoordinatesReceived(this.updatePlayerCoordinates);
    this.socketManager.registerPlayerStopReceived(this.stopPlayer);
  }

  updatePlayerCoordinates({ playerId, coordinatesData }) {
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

  update() {
    this.players[this.currentPlayer.id].sprite.setVelocity(0);

    if (this.gameOver) {
      return;
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
