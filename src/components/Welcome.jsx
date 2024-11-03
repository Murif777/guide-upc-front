import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function WelcomeMessage(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Bienvenido
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Introduccion</h4>
        <p>
          Este es un sistema creado para personas con discapacidad, su proposito es que facilite la movilidad 
          de estas personas dentro del campus de la Universidad Popular del Cesar, proporcionando 
          rutas optimizadas y seguras para su desplazamiento autónomo.
        </p>
        <h4>Instrucciones</h4>
        <p>
          ...
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default WelcomeMessage;
{/*
function App() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

render(<App />);    */}