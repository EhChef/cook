import React, { Component } from 'react';

import { Container, Row, Col } from 'reactstrap';
import { GetData } from '../services/GetData';
import NavBar from './NavBar';
import { socket } from '../shared/socket';
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
                datas: result,
                orders: []
            });
        });
        this.socketListen();
    }

    socketListen() {
        console.log('listen')
        let room = localStorage.getItem('account');
        socket.on('connect', () => {
            console.log('connected')
            socket.emit('room', { roomId: room, role: 0 });
            socket.on('order', (order) => {
                // Attache l'order au state ici
                console.log(order)
                this.setState({
                    datas: order
                });
            })
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
                            {datas.map(data =>
                                <Col xs="2" className="order">
                                    <Row>
                                        <Col>
                                            <p>{moment(data.created_at).format('DD/MM h:mm')}</p>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col xs="4">
                                            1
                                    </Col>
                                        <Col>
                                            {data[1]}
                                    </Col>
                                    </Row>
                            
                                    <i className="fas fa-check textGreen"></i>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Orders;
