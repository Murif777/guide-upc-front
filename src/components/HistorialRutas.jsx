import { LinkContainer } from 'react-router-bootstrap';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

export const HistorialRutas = () => {
  return (
   <>
    <LinkContainer to="/inicio">
        <Button variant="success">Volver a opciones</Button>
      </LinkContainer>
   </> 
  )
}
export default HistorialRutas;