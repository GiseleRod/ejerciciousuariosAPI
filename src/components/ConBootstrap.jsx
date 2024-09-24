import Accordion from 'react-bootstrap/Accordion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Container } from 'react-bootstrap';

const ConBootstrap= ()=> {
    const [usuarios, setUsuarios] = useState([]);
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users').then(respuesta => {
            //Data en consola
            console.log(respuesta.data);  
            //Data renderizada     
            setUsuarios(respuesta.data);
          })
      },[]);

    return (
        <Container fluid>
        <Accordion> 
            <Row>
                {usuarios.map((data,i)=> {
                    return (
                        <Col md={12} lg={6}>
                        <Accordion.Item eventKey={i} key={i}>
                        <Accordion.Header>{data.name}</Accordion.Header>
                        <Accordion.Body>
                            <Card>
                                <Card.Header>Dirección</Card.Header>
                                <Card.Body>
                                    <Card.Text>{data?.address.street}</Card.Text>
                                    <Card.Text>{data?.address.suite}</Card.Text>
                                    <Card.Text>{data?.address.city}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Accordion.Body>
                    </Accordion.Item>
                </Col>
                )
            })}
            </Row>
        </Accordion>
        </Container>
      );
}

export default ConBootstrap