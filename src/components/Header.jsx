
import { Navbar, Nav, Container, Image, Button, Form, NavDropdown, Offcanvas } from 'react-bootstrap';

function OffcanvasExample() {
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} style={NavBarStyle}>
          <Container fluid>
          <Navbar.Brand href="#">
              <Image 
                src="https://www.unicesar.edu.co/wp-content/uploads/2024/05/LOGO-UPC-VERDE-2.png" 
                alt="Logo" 
                width={140}
                height={50}
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}style={NavToggleStyle} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Opciones
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1"> Crear una ruta</Nav.Link>
                  <Nav.Link href="#action2">Ver historial de rutas</Nav.Link>
                  <Nav.Link href="#action2">Ver lugares</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
const NavBarStyle={
   backgroundColor: '#23262e'
}
const NavToggleStyle={
  backgroundColor: '#424241'
}
export default OffcanvasExample;