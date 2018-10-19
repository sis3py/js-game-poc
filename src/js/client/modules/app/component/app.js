import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import CreateGamePage from '../../createGame/component/CreateGamePage.js';
import JoinGamePage from '../../joinGame/component/JoinGamePage.js';
import OptionsPage from '../../options/component/OptionsPage.js';
import TitlePage from '../../title/component/TitlePage.js';
import { serverAdress } from '../../../../configuration/configuration.js';
import io from 'socket.io-client';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null
        };
    }
    componentDidMount() {
        this.connectSocket();
    }
    connectSocket() {
        try {
            console.log("connexion au serveur socket");
            this.setState({
                socket: io.connect(serverAdress, {
                    transports: ['websocket'],
                    reconnectionAttempts: 15
                })
            });
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={TitlePage} />
                    <Route path="/create" render={() => <CreateGamePage socket={this.state.socket} />} />
                    <Route path="/join" render={() => <JoinGamePage socket={this.state.socket} />} />
                    <Route path="/options" component={OptionsPage} />
                </Switch>
            </BrowserRouter>
        );
    }
}

import "../../../../../scss/main.scss";

export default App;