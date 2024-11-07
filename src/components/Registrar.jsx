import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';  
import { LinkContainer } from 'react-router-bootstrap';
import Login from './Login';

export default function Registrar() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/usuarios', {
        email: formData.email,
        password: formData.password
      });
      console.log(response.data);
      setIsRegistered(true);
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  if (isRegistered) {
    return <Login />;
  }

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <h1 className="text-center mb-4" style={{ color: '#33b72b' }}>
                Registrar - GUIDE-UPC
              </h1>
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Ingrese su email" required value={formData.email} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Ingrese su contraseña" required value={formData.password} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control type="password" name="confirmPassword" placeholder="Confirme su contraseña" required value={formData.confirmPassword} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check 
                    type="checkbox" 
                    label="Acepto los términos y condiciones" 
                    required 
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="success" type="submit" className="mt-3" style={{ backgroundColor: '#33b72b' }}>
                    Registrar
                  </Button>
                </div>

                <div className="text-center mt-3">
                  <p>
                    ¿Ya tienes una cuenta?{' '}
                    <LinkContainer to="/login">
                      <a href="#login" className="text-decoration-none" style={{ color: '#33b72b' }}>
                        Iniciar sesión
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
  );
}
