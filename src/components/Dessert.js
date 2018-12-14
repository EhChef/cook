import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Container, Row, Col, Table, ButtonGroup, InputGroupAddon, InputGroup, Input } from 'reactstrap';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import NavBar from './NavBar';

import '../css/starters.css';

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
            cSelected: []
        };
        this.add = this.add.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getData = this.getData.bind(this);
        this.deleteData = this.deleteData.bind(this);

        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
    }

    add(){
        if (this.state.name !== "" && this.state.price !== ""){
            AddData('desserts', this.state).then(() => {
                this.getData();
                this.setState({
                    name: "",
                    price: ""
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

    onRadioBtnClick(rSelected) {
        this.setState({ rSelected });
    }

    onCheckboxBtnClick(selected) {
        const index = this.state.cSelected.indexOf(selected);
        if (index < 0)
            this.state.cSelected.push(selected);
        else
            this.state.cSelected.splice(index, 1);
        this.setState({ cSelected: [...this.state.cSelected] });
    }

  render() {

      const { datas } = this.state;

    return (
        <Container fluid>
            <Row>
                <NavBar />
                <Col>
                    <h1 className="subTitle">Liste des desserts</h1>
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
                                    onClick={() => this.onRadioBtnClick(1)}
                                    active={this.state.rSelected === 1}
                                >
                                    Disponible
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={() => this.onRadioBtnClick(2)}
                                    active={this.state.rSelected === 2}
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
                    <br />
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
                                        { data.price } €
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
                </Col>
            </Row>
        </Container>
    );
  }
}

export default Dessert;
