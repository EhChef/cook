import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Container, Row, Col, Table, Modal, ModalHeader, ModalBody, ModalFooter, InputGroupAddon, InputGroup, Input } from 'reactstrap';
import { Button, FormGroup} from "react-bootstrap";
import NavBar from './NavBar';
import Autocomplete from 'react-autocomplete'

import { AddData } from '../services/AddData';
import { GetData } from '../services/GetData';

import '../css/orders.css';

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            starterInput: '',
            starter: '',
            mainCourseInput: '',
            mainCourse: '',
            dessertInput: '',
            dessert: '',
            starters: [],
            mainCourses: [],
            desserts: [],
            price: 0,
        };
        this.add = this.add.bind(this);
        this.getData = this.getData.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        GetData('starters').then((result) => {
            this.setState({
                starters: result
            });
        });
        GetData('mainCourses').then((result) => {
            this.setState({
                mainCourses: result
            });
        });
        GetData('desserts').then((result) => {
            this.setState({
                desserts: result
            });
        });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange(name, e){
        this.setState({ [name]: e.target.value });
    }

    onStarterSelect(e) {
        console.log(e);
        let itemId = this.state.starters.filter(a => a.name = e)[0]._id;
        console.log('id : ', itemId);
        this.setState({
            starterInput: e,
            starter: itemId
        })
    }

    onMainCourseSelect(e) {
        console.log(e);
        let itemId = this.state.mainCourses.filter(a => a.name = e)[0]._id;
        console.log('id : ', itemId);
        this.setState({
            mainCourseInput: e,
            mainCourse: itemId
        })
    }

    onDessertSelect(e) {
        console.log(e);
        let itemId = this.state.desserts.filter(a => a.name = e)[0]._id;
        console.log('id : ', itemId);
        this.setState({
            dessertInput: e,
            dessert: itemId
        })
    }

    shouldRender(item, value) {
        //console.log('test');
        //console.log(item.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
    }

    getData(){
        GetData('menus').then((result) => {
            this.setState({
                datas: result
            });
        });
    }

    add(){
        console.log(this.state)
        if (this.state.name !== "" && this.state.price !== ""){
            AddData('menus', this.state).then(() => {
                this.getData();
                this.setState({
                    name: "",
                    price: "",
                    available: true
                })
            });
        }
        this.toggle();
    }

    render() {
        // console.log('starters  : ', this.state.starters);
        // console.log('starter  : ', this.state.starter);
        // console.log('starterInput  : ', this.state.starterInput);
        // this.state.starters.map(starter => starter.name).indexOf(this.state.starterInput) > -1
        let starterRegex = new RegExp(this.state.starterInput, 'g');
        let mainCourseRegex = new RegExp(this.state.mainCourseInput, 'g');
        let dessertRegex = new RegExp(this.state.dessertInput, 'g');

        const { datas } = this.state;

        return (
            <Container fluid>
                <Row>
                    <NavBar />
                    <Col>
                        <Row>
                            <Col>
                                <h1 className="subTitle">Liste des menus</h1>
                            </Col>
                            <Col xs="3" className="mt-4">
                                <Button
                                    block
                                    type="submit"
                                    id="login-button"
                                    onClick={this.toggle}
                                >
                                    Ajouter un menu
                                </Button>
                                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                    <ModalHeader toggle={this.toggle}>Ajouter un menu</ModalHeader>
                                    <ModalBody>
                                        <FormGroup controlId="starter">
                                            <Autocomplete
                                                getItemValue={(item) => item.name}
                                                shouldItemRender={(item, value) => starterRegex.test(item.name) }
                                                items={this.state.starters}
                                                renderItem={(item, isHighlighted) =>
                                                    <div key={item._id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                                      {item.name}
                                                    </div>
                                                }
                                                value={this.state.starterInput}
                                                onChange={this.onChange.bind(this, 'starterInput')}
                                                onSelect={this.onStarterSelect.bind(this)}
                                                inputProps={{ placeholder: 'Nom entrée', className: "form-control" }}
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="mainCourse">
                                            <Autocomplete
                                                getItemValue={(item) => item.name}
                                                shouldItemRender={(item, value) => mainCourseRegex.test(item.name) }
                                                items={this.state.mainCourses}
                                                renderItem={(item, isHighlighted) =>
                                                    <div key={item._id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                                      {item.name}
                                                    </div>
                                                }
                                                value={this.state.mainCourseInput}
                                                onChange={this.onChange.bind(this, 'mainCourseInput')}
                                                onSelect={this.onMainCourseSelect.bind(this)}
                                                inputProps={{ placeholder: 'Nom plat', className: "form-control" }}
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="Dessert">
                                            <Autocomplete
                                                getItemValue={(item) => item.name}
                                                shouldItemRender={(item, value) => dessertRegex.test(item.name) }
                                                items={this.state.desserts}
                                                renderItem={(item, isHighlighted) =>
                                                    <div key={item._id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                                      {item.name}
                                                    </div>
                                                }
                                                value={this.state.desssertInput}
                                                onChange={this.onChange.bind(this, 'dessertInput')}
                                                onSelect={this.onDessertSelect.bind(this)}
                                                inputProps={{ placeholder: 'Nom dessert', className: "form-control" }}
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="price">
                                            <InputGroup>
                                                <Input
                                                    type="number"
                                                    placeholder="Prix"
                                                    name="price"
                                                    value={this.state.price}
                                                    onChange={this.onChange.bind(this, 'price')}
                                                />
                                                <InputGroupAddon addonType="append">€</InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.add}>Ajouter</Button>{' '}
                                        <Button color="secondary" onClick={this.toggle}>Annuler</Button>
                                    </ModalFooter>
                                </Modal>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Table striped className="text-center">
                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th width="30%">Prix</th>
                                        <th width="20%">Disponible</th>
                                        <th width="20%">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </Table>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Menu;
