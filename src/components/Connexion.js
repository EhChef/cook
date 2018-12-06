import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";

import { PostConnexion } from '../services/PostConnexion';
import logo from '../img/logo.png';

import '../css/connexion.css';

class Connexion extends Component {

    constructor(props) {
    super(props);

    this.state = {
        email: "",
        password: ""
    }
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  login(){
      PostConnexion('accounts/login', this.state).then((result) => {
          if (result.token){
              localStorage.setItem('token', result.token);
              this.props.history.push('/orders');
          }
      });
  }

  onChange(e){
      this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
        <div className="App">
            <div className="Login">
                <div className="wrapper">
                	<div className="container">
                        <img src={logo} alt="Logo Eh Chef !" className="logo" />
                        <div className="form">
                            <FormGroup controlId="email" bsSize="large">
                                <FormControl
                                    type="email"
                                    placeholder="E-mail"
                                    name="email"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large">
                                <FormControl
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <Button
                                block
                                type="submit"
                                id="login-button"
                                onClick={this.login}
                            >
                                Login
                            </Button>
                        </div>
                	</div>
                </div>
            </div>
        </div>
    );
  }
}

export default Connexion;
