import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Connexion from '../components/Connexion';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLogged: false
        };
    }

    checkLogin() {
        return localStorage.getItem('token') !== null && typeof localStorage.getItem('token') !== "undefined";
    }

    render() {
        const isLogged = this.checkLogin();
        const successRoute = <Route {...this.props} />;
        const failRoute = <Route component={Connexion} />;

        if (isLogged) {
            return successRoute;
        } else {
            return failRoute;
        }
    }

}

export default App;
