import React, { Component } from 'react';

import { Container, Row, Col } from 'reactstrap';

import '../css/orders.css';
import logo from '../img/logo.png';

class Orders extends Component {

    constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
        <Container fluid>
            <Row>
                <Col xs="2" className="navPadding">
                    <div className="nav">
                        <img src={logo} alt="Logo Eh Chef !" className="logoNav" />
                    </div>
                </Col>
                <Col>TO-DO: Liste des comamndes</Col>
            </Row>
        </Container>
    );
  }
}

export default Orders;
