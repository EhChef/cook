import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Container, Row, Col, Table, ButtonGroup, InputGroupAddon, InputGroup, Input } from 'reactstrap';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import NavBar from './NavBar';

import '../css/orders.css';

import { AddData } from '../services/AddData';
import { GetData } from '../services/GetData';
import { DeleteData } from '../services/DeleteData';

class Dessert extends Component {

    constructor(props) {
        super(props);

        this.state = {
            datas: [],
            name: "",
            account: localStorage.getItem('account'),
            price: "",
            available: true
        };
        this.add = this.add.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getData = this.getData.bind(this);
        this.deleteData = this.deleteData.bind(this);

        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    add(){
        if (this.state.name !== "" && this.state.price !== ""){
            AddData('desserts', this.state).then(() => {
                this.getData();
                this.setState({
                    name: "",
                    price: "",
                    available: true
                })
            });
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    getData(){
        GetData('desserts').then((result) => {
            this.setState({
                datas: result
            });
        });
    }

    deleteData(id){
        DeleteData('desserts', id).then(() => {
            const slicedArray = this.state.datas.filter(d => d._id !== id);
            this.setState({ datas: slicedArray });
        });
    }

    componentDidMount() {
        this.getData();
    }

    onRadioBtnClick(available) {
        this.setState({ available });
    }

  render() {

      const { datas } = this.state;

    return (
        <Container fluid>
            <Row>
                <NavBar />
                <Col>
                    <Row>
                        <Col>
                            <h1 className="subTitle">Liste des desserts</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup controlId="name">
                                <FormControl
                                    type="text"
                                    placeholder="Nom"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup controlId="price">
                                <InputGroup>
                                    <Input
                                        type="number"
                                        placeholder="Prix"
                                        name="price"
                                        value={this.state.price}
                                        onChange={this.onChange}
                                    />
                                    <InputGroupAddon addonType="append">€</InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col className="text-center">
                            <ButtonGroup>
                                <Button
                                    color="primary"
                                    onClick={() => this.onRadioBtnClick(true)}
                                    active={this.state.available === true}
                                >
                                    Disponible
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={() => this.onRadioBtnClick(false)}
                                    active={this.state.available === false}
                                >
                                    Non disponible
                                </Button>
                            </ButtonGroup>
                        </Col>
                        <Col xs="2">
                            <Button
                                block
                                type="submit"
                                id="login-button"
                                onClick={this.add}
                            >
                                Ajouter
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Table striped hover className="text-center">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th width="30%">Prix</th>
                                    <th width="20%">Disponible</th>
                                    <th width="20%">Supprimer</th>
                                </tr>
                            </thead>
                            <tbody>
                                { datas.map(data =>
                                    <tr key={ data._id }>
                                        <td>
                                            { data.name }
                                        </td>
                                        <td xs="1">
                                            { data.price.toFixed(2) } €
                                        </td>
                                        <td>
                                            { data.available === true ? <i className="fas fa-check textGreen"></i> : <i className="fas fa-times textRed"></i> }
                                        </td>
                                        <td>
                                            <Link to="#" className="trash" onClick={() => this.deleteData(data._id)} ><i className="fas fa-trash-alt"></i></Link>
                                        </td>
                                    </tr>
                                ) }
                            </tbody>
                        </Table>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
  }
}

export default Dessert;
