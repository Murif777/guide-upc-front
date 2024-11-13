
import { LinkContainer } from 'react-router-bootstrap';
import OpcionCard from '../components/common/OpcionCard';
import '../assets/styles/MenuOpciones.css'; 

function MenuOpciones() {
  return (
    <>
        <div className='Title'>
          <h5>Seleccione una opción</h5>
        </div>
        <div className='Container'>
              <LinkContainer to="/inicio/crear-ruta">
                <div className='Card'>
                  <OpcionCard
                    imagen="https://img.freepik.com/vector-gratis/ilustracion-icono-galeria_53876-27002.jpg" 
                    titulo="Crear ruta" 
                    descripcion="Crea una ruta seleccionando punto de partida y llegada"
                  />
                </div>
              </LinkContainer>
              <LinkContainer to="/inicio/historial-rutas">
                <div className='Card'>
                  <OpcionCard
                      imagen="https://img.freepik.com/vector-gratis/ilustracion-icono-galeria_53876-27002.jpg" 
                      titulo="Ver historial de rutas" 
                      descripcion="Consulta las rutas que has consultado anteriormente"
                    />
                </div>
              </LinkContainer>
              <LinkContainer to="/inicio/ver-lugares">
                <div className='Card'>
                  <OpcionCard
                      imagen="https://img.freepik.com/vector-gratis/ilustracion-icono-galeria_53876-27002.jpg" 
                      titulo="Ver lugares" 
                      descripcion="Busca un lugar en especifico para obtener informacion"
                    />
                </div>
              </LinkContainer>
        </div>
    </>
  );
}

export default MenuOpciones;
