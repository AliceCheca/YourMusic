import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Cabecalho from '../components/Cabecalho'
import Rodape from '../components/Rodape'

const Inicio = () => {
    return (
        <Container fluid className="p-8">
            <Cabecalho />
            <Row>
                <Col xs={12} lg={6}>
                    <h1>Boas vindas ao YourMusic!</h1>
                    <p>Você está na página inicial do nosso site. </p>
                    <p> Comece adicionando suas músicas favoritas pelo menu acima =)</p>
                </Col>
            </Row>
            <Rodape />
        </Container>
    )
}

export default Inicio