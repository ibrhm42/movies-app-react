import React from 'react';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import './App.scss';
const Bootstrap = () => {
    return(
        <Container>
        <Row>
          <Col sm={4}>1 of 3</Col>
          <Col sm={4}>2 of 3 (wider)</Col>
          <Col sm={4}>3 of 3</Col>
        </Row>
     
      </Container>

    )
}

export default Bootstrap;