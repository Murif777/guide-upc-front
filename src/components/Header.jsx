import { Navbar, Nav, Container, Image, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuthToken, request, setAuthHeader } from '../helpers/axios_helper';

function Header({ onLogout }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPhotoURL, setUserPhotoURL] = useState("");

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setIsAuthenticated(true);
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = () => {
    request('GET', '/profile')
      .then(response => {
        if (response.data && response.data.foto) {
          setUserPhotoURL(response.data.foto);
        }
      })
      .catch(error => {
        console.error('Error al obtener el perfil del usuario:', error);
      });
  };

  const handleLogout = () => {
    setAuthHeader(null);
    setIsAuthenticated(false);
    navigate("/login"); // Redirigir al usuario a la página de inicio de sesión
  };

  return (
    <>
      <Navbar expand="lg" style={NavBarStyle}>
        <Container fluid>
          <LinkContainer to="/inicio">
            <Navbar.Brand href="#inicio">
              <Image 
                src="https://www.unicesar.edu.co/wp-content/uploads/2024/05/LOGO-UPC-VERDE-2.png" 
                alt="Logo" 
                width={140}
                height={50}
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Nav className="ml-auto">
            <NavDropdown title={<Image src={userPhotoURL} roundedCircle width={30} height={30} />} id="basic-nav-dropdown">
              <NavDropdown.Item href="#editar-perfil">Editar perfil</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

const NavBarStyle = {
  backgroundColor: '#23262e'
};

export default Header;
