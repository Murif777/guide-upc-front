import { Nav, Image, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuthToken, setAuthHeader } from '../../helpers/axios_helper';
import { getProfile} from '../../services/UsuarioService';
import '../../assets/styles/MenuUsuario.css';

const defaultProfilePics = [
  "https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e5d0c2ab246786ca1d5e_86.png",
  "https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/671ff8b58b0b4715228b0c1f_99.png",
  "https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/671ff00d29c65f1f25fb28c0_95.png",
  "https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e5e99c9555f1ca59ad72_83.png",
  "https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e9ab1c71c3adb2b2e71c_59.png",
  "https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e9a09291ddecfb8e714b_60.png",
  "https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3eb826bc6e984281381bc_20.png",
  "https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3ebb4e15ae36942b44682_17.png",
  "https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e661d456453abd7fa14b_73.png",
  "https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3ea338a302af8c2b8cc58_47.png",
  "https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3ec359922e31368c2c58e_03.png",
  "https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3eaa4e481354bcf4b6b5c_38.png",
  "https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e9c4ccde70cabd69cb17_56.png",
  "https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/671ff18d174384ea7bb16670_96.png",
  "https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e2b30608f3f68caf31d3_94.png",
  "https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e5e1ccde70cabd67779a_84.png"
];

const MenuUsuario = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPhotoURL, setUserPhotoURL] = useState("");

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setIsAuthenticated(true);
      getProfile()
        .then(perfil => {
          console.log("Perfil obtenido:", perfil);
          if (perfil && perfil.foto) {
            setUserPhotoURL(`http://localhost:8080/${perfil.foto}`);
          } else {
            const randomIndex = Math.floor(Math.random() * defaultProfilePics.length);
            setUserPhotoURL(defaultProfilePics[randomIndex]);
          }
        })
        .catch(error => {
          console.error('Error al obtener el perfil del usuario:', error);
          const randomIndex = Math.floor(Math.random() * defaultProfilePics.length);
          setUserPhotoURL(defaultProfilePics[randomIndex]);
        });
    }
  }, []);

   const handleLogout = () => {
    setAuthHeader(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleEdit = () => {
    navigate("/inicio/editar-perfil");
  };

  return (
    <Nav>
      <NavDropdown 
        title={
          <div style={{
            width: '50px',
            height: '50px',
            overflow: 'hidden',
            borderRadius: '50%',
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
          }}>
            <Image 
              src={userPhotoURL} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              alt="Foto de perfil"
            />
          </div>
        } 
        id="basic-nav-dropdown"
        className="custom-dropdown"
      >
        <NavDropdown.Item onClick={handleEdit}>Editar perfil</NavDropdown.Item>
        <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

export default MenuUsuario;
