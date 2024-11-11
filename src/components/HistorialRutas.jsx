import { LinkContainer } from 'react-router-bootstrap';
import { Form, Button, Tab, Row, Col, ListGroup, Container } from 'react-bootstrap';
import './HistorialRutas.css';
export const HistorialRutas = () => {
  return (
   <>
      <LinkContainer to="/inicio">
        <Button variant="success">Volver a opciones</Button>
      </LinkContainer>
      <div className="fullscreen">
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#crear-ruta">
        <div className="centered-container">
          <h5>Seleccione una ruta del historial</h5>
          <Row>
            <Col sm={12}>
              <ListGroup>
                  <ListGroup.Item action href="#Item">
                    Ruta de -- a --
                  </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      </Tab.Container>
    </div>
   </> 
  )
}
export default HistorialRutas;