import React, { useState } from 'react'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'
import Inicio from './Inicio'
import { LinkContainer } from 'react-router-bootstrap';

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (event) => {
    event.preventDefault()
    setIsLoggedIn(true)
  }

  if (isLoggedIn) {
    return <Inicio />
  }

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <h1 className="text-center mb-4" style={{ color: '#33b72b' }}>
                Log in - GUIDE-UPC
              </h1>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control type="email" placeholder="Ingrese su email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Ingrese su contraseña" required />
                </Form.Group>

                <Form.Group className="mb-3 d-flex justify-content-between" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Recordar" />
                  <a href="#" className="text-decoration-none" style={{ color: '#33b72b' }}>
                    Olvidé mi contraseña
                  </a>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="success" type="submit" className="mt-3" style={{ backgroundColor: '#33b72b' }}>
                    Login
                  </Button>
                </div>

                <div className="text-center mt-3">
                  <p>
                    No tengo cuenta{' '}
                    <LinkContainer to="/registrar">
                      <a href="#registrar" className="text-decoration-none" style={{ color: '#33b72b' }}>
                        Registrar
                      </a>
                    </LinkContainer>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}