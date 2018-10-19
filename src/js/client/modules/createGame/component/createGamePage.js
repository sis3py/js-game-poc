import React from 'react';
import { createGame } from '../logic/createGameLogic';

class CreateGamePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameName: '',
        };
        this.createGame = this.createGame.bind(this);
        this.updateGameName = this.updateGameName.bind(this);
    }
    updateGameName(e) {
        console.log(e);
        this.setState({ gameName: e.target.value });
    }
    createGame() {
        console.log("create");
        createGame(this.props.socket, this.state.gameName);
    }
    render() {
        return (
            <div>
                <div>
                    <span>Create game</span>
                    <input type="text" value="" onChange={this.updateGameName} />
                    <input type="button" value="OK" onClick={this.createGame} />
                </div>
                <div>
                </div>
            </div>
        );
    }
}

export default CreateGamePage;