import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import MenuUsuario from '../specificComponent/MenuUsuario';
import logotipo from "../../assets/images/logotipo.png";

function Header() {
  return (
    <>
      <StyleTag />
      <Navbar expand="lg" style={NavBarStyle}>
        <Container fluid>
          <LinkContainer to="/inicio">
            <Navbar.Brand href="#inicio">
              <Image 
                src={logotipo}
                alt="Logo" 
                width={125}
                height={60}
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </LinkContainer>

          {/* Elementos que irán a la izquierda */}
          <Nav className="mr-auto">
            {/* Puedes agregar más elementos de navegación aquí si es necesario */}
          </Nav>

          {/* Foto en la esquina superior derecha, centrada verticalmente */}
          <MenuUsuario />
        </Container>
      </Navbar>
    </>
  );
};  

const NavBarStyle = {
  backgroundColor: '#435a6d',
  padding: 0,
  position: 'relative',
};

const customStyles = `
.custom-dropdown .dropdown-menu {
  position: absolute !important;
  right: 0;
  left: auto !important;
  top: 100% !important;
  transform: none !important;
}
`;

const StyleTag = () => (
  <style>{customStyles}</style>
);

export default Header;
