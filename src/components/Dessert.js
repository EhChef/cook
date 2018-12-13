import React, { Component } from 'react';

import { Container, Row, Col } from 'reactstrap';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import NavBar from './NavBar';

import '../css/orders.css';

import { AddData } from '../services/AddData';
import { GetData } from '../services/GetData';

class Dessert extends Component {

  constructor(props) {
    super(props);

    this.state = {
        datas: [],
        name: "",
        account: localStorage.getItem('account'),
        price: ""
    };
    this.add = this.add.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getData = this.getData.bind(this);
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

  componentDidMount() {
    this.getData();
  }

  render() {

    const { datas } = this.state;

    return (
        <Container fluid>
            <Row>
                <NavBar />
                <Col>
                    <h1>Liste des desserts</h1>
                    <br />
                    <Row className="text-center">
                        <Col>
                            Nom
                        </Col>
                        <Col>
                            Prix
                        </Col>
                        <Col xs="1">
                            Disponible
                        </Col>
                        <Col>
                            Créer
                        </Col>
                    </Row>
                    <br />
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
                                <FormControl
                                    type="number"
                                    placeholder="Prix"
                                    name="price"
                                    value={this.state.price}
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="1">
                        </Col>
                        <Col>
                            <Button
                                block
                                type="submit"
                                id="login-button"
                                onClick={this.add}
                            >
                                Créer
                            </Button>
                        </Col>
                    </Row>
                    <br />
                    { datas.map(data =>
                        <Row key={ data._id }>
                            <Col>
                                <p>{ data.name }</p>
                            </Col>
                            <Col xs="1">
                                <p>{ data.price }</p>
                            </Col>
                            <Col>
                                <p></p>
                            </Col>
                        </Row>
                    ) }
                </Col>
            </Row>
        </Container>
    );
  }
}

export default Dessert;
