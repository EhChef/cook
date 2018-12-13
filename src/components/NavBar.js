import React, { Component } from 'react';
import { Col, Nav, NavItem, NavLink  } from 'reactstrap';

import '../css/orders.css';
import logo from '../img/logo.png';


class NavBar extends Component {

  render() {

    return (
        <Col xs="2" className="navPadding">
            <div className="nav">
                <img src={logo} alt="Logo Eh Chef !" className="logoNav" />
                <Nav>
                    <NavItem>
                        <NavLink href="/orders">Tableau des commandes</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/starter">Entrée</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/mainCourse">Plat</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/dessert">Dessert</NavLink>
                    </NavItem>
                </Nav>
            </div>
        </Col>
    )
  }
}

export default NavBar
