import React, { Component } from 'react';
import { Col, Nav, NavItem  } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import '../css/nav.css';
import logo from '../img/logo.png';


class NavBar extends Component {

  render() {

    return (
        <Col xs="2" className="navPadding">
            <div className="navLeft">
                <img src={logo} alt="Logo Eh Chef !" className="logoNav" />
                <Nav>
                    <NavItem>
                        <NavLink to="/orders" activeClassName="active">Tableau des commandes</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/starter" activeClassName="active">Créer les entrées</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/mainCourse" activeClassName="active">Créer les plats</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/dessert" activeClassName="active">Créer les desserts</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/menu" activeClassName="active">Créer les menus</NavLink>
                    </NavItem>
                </Nav>
            </div>
        </Col>
    )
  }
}

export default NavBar
