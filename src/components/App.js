import React, { Component } from 'react';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Connexion from './Connexion';
import Orders from './Orders';
import Starter from './Starter';
import MainCourse from './MainCourse';
import Dessert from './Dessert';
import Menu from './Menu';
import SessionGuard from '../guards/SessionGuard';

class App extends Component {

    constructor(props) {
        super(props);

        this.history = createHistory();
        this.unlisten = this.history.listen(() => {
            window.scrollTo(0, 0);
        });
    }

    render() {
        return (
            <Router history={this.history}>
                <Switch>
                    <Route exact path="/login" component={() => (
                        localStorage.getItem('token') !== null ?
                        <Redirect to="/orders" /> :
                        <Connexion />
                    )} />
                    <Route exact path="/" render={() => (
                        <Redirect to="/orders" />
                    )} />
                    <SessionGuard exact path="/orders" component={Orders} />
                    <SessionGuard exact path="/starter" component={Starter} />
                    <SessionGuard exact path="/mainCourse" component={MainCourse} />
                    <SessionGuard exact path="/dessert" component={Dessert} />
                </Switch>
            </Router>
        )
    }

}

export default App;
