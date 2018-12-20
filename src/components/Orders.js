import React, { Component } from 'react';

import { Container, Row, Col } from 'reactstrap';
import { GetData } from '../services/GetData';
import NavBar from './NavBar';

import '../css/orders.css';

import moment from 'moment'

class Orders extends Component {

  constructor(props) {
    super(props);

    this.state = {
        datas: [],
    };
  }

  componentDidMount() {
    GetData('orders').then((result) => {
        this.setState({
            datas: result
        });
    });
  }

  render() {

    const { datas } = this.state;

    return (
        <Container fluid>
            <Row>
                <NavBar />
                <Col>
                    <Row>
                        { datas.map(data =>
                            <Col xs="2" className="order">
                                <Row>
                                    <Col>
                                        <p>Table <br/><b>{ data.table }</b></p>
                                    </Col>
                                    <Col>
                                        <p>Cmd <br/><b>{ data.orderId }</b></p>
                                    </Col>
                                    <Col>
                                        <p>{ moment(data.created_at).format('DD/MM h:mm') }</p>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col xs="4">
                                        1
                                    </Col>
                                    <Col>
                                        Menu
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="decal">
                                        Entrée
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="decal">
                                        Plat
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="decal">
                                        Dessert
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col xs="4">
                                        1
                                    </Col>
                                    <Col>
                                        Plat
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col xs="4">
                                        1
                                    </Col>
                                    <Col>
                                        Vin
                                    </Col>
                                </Row>
                                <hr />
                                <i className="fas fa-check textGreen"></i>
                            </Col>
                        ) }
                    </Row>
                </Col>
            </Row>
        </Container>
    );
  }
}

export default Orders;
