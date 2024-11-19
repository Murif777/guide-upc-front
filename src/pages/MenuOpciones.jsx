
import { LinkContainer } from 'react-router-bootstrap';
import OpcionCard from '../components/common/OpcionCard';
import '../assets/styles/MenuOpciones.css'; 
//import WelcomeMessage from '../components/common/Welcome';

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
                    imagen="http://localhost:8080/uploads\1732002694310-5c20a92c-8c01-4082-8bef-f16dea5a6717.png" 
                    titulo="Crear ruta" 
                    descripcion="Crea una ruta seleccionando punto de partida y llegada"
                  />
                </div>
              </LinkContainer>
              <LinkContainer to="/inicio/historial-rutas">
                <div className='Card'>
                  <OpcionCard
                      imagen="http://localhost:8080/uploads\1732005863894-3023aa70-a92c-4924-8d0d-5f673b926163.png" 
                      titulo="Ver historial de rutas" 
                      descripcion="Consulta las rutas que has consultado anteriormente"
                    />
                </div>
              </LinkContainer>
              <LinkContainer to="/inicio/ver-lugares">
                <div className='Card'>
                  <OpcionCard
                      imagen="http://localhost:8080/uploads\1732003938466-beb1da93-8806-45d4-be83-138cb979b54b.png" 
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
