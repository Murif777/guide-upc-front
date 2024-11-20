import React, { useState, useEffect } from 'react';
import { Form, FloatingLabel, Button, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SistemaRutas from './SistemaRutas';
import { sendRuta } from '../../services/RutaService';
import { getProfile } from '../../services/UsuarioService';
import '../../assets/styles/MenuRutas.css'

function MenuRutas() {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [submittedStart, setSubmittedStart] = useState(null);
  const [submittedEnd, setSubmittedEnd] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getProfile()
      .then(perfil => {
        console.log("Perfil obtenido:", perfil);
        setId(perfil.id);
      })
      .catch(error => {
        console.error('Error al obtener el perfil', error);
      });
  }, []);

  const handleRouteSearch = () => {
    if (startLocation && endLocation) {
      setLoading(true);
      setTimeout(() => {
        setSubmittedStart(startLocation);
        setSubmittedEnd(endLocation);
        setLoading(false);
      }, 500);
      saveRoute(startLocation, endLocation, id);
    }
  };

  const handleUseCam = () => {
    if (!startLocation || !endLocation) {
      setShowModal(true);
    }
  };

  const saveRoute = async (start, end, userId) => { 
    try { 
      await sendRuta(userId, start, end); 
      console.log('Ruta guardada exitosamente '+userId+startLocation+endLocation); 
    } catch (error) { 
      console.error('Error al guardar la ruta:', error); 
    } 
  };

  return (
    <div style={sidebarStyle}>
      <h5>Opciones de ruta</h5>
      <div className="mb-3">
        <FormFloatingSelectExample value={startLocation} setValue={setStartLocation} options={LUGARES} />
      </div>
      <div className="mb-3">
        <FormFloatingSelectDestination value={endLocation} setValue={setEndLocation} options={LUGARES} />
      </div>
      <div className="mb-3">
        <Button 
          className="btn-primary me-3" 
          disabled={isLoading} 
          onClick={!isLoading ? handleRouteSearch : null}
        >
          {isLoading ? 'Cargando...' : 'Buscar'}
        </Button>
        {startLocation && endLocation ? (
            <LinkContainer 
              to={{
                pathname: "/inicio/cam-guide",
                search: `?start=${startLocation}&end=${endLocation}`
              }}
            >
              <Button className="btn-primary me-3"> Usar camara</Button>
          </LinkContainer>
        ) : (
          <Button 
            className="btn-primary me-3" 
            onClick={handleUseCam}
          >
            Usar camara
          </Button>
        )}
      </div>

      <SistemaRutas startLocation={submittedStart} endLocation={submittedEnd} />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Seleccione Lugares</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Por favor, seleccione un lugar de partida y un lugar de destino antes de usar la cámara.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}


function FormFloatingSelect({ controlId, label, value, setValue, options }) {
  const formatDisplayName = (name) => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  return (
    <FloatingLabel controlId={controlId} label={label}>
      <Form.Select
        aria-label={`Floating label select for ${label}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="">Seleccione una opción</option>
        {options.map((option) => (
          <option key={option.id} value={option.nombre}>
            {formatDisplayName(option.nombre)}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  );
}

function FormFloatingSelectExample({ value, setValue, options }) {
  return <FormFloatingSelect controlId="floatingSelect" label="Seleccione lugar de partida" value={value} setValue={setValue} options={options} />;
}

function FormFloatingSelectDestination({ value, setValue, options }) {
  return <FormFloatingSelect controlId="floatingSelectDestination" label="Seleccione lugar de destino" value={value} setValue={setValue} options={options} />;
}
const LUGARES = [
  { id: 1, nombre: "entrada_principal" },
  { id: 2, nombre: "registro_control" },
  { id: 3, nombre: "zona_administrativa" },
  { id: 4, nombre: "intercepcion_principal" },
  { id: 5, nombre: "division_financiera" },
  { id: 6, nombre: "banos_entrada" },
  { id: 7, nombre: "auditorio_julio_villazon" },
  { id: 8, nombre: "biblioteca" },
  { id: 9, nombre: "casilleros" },
  { id: 10, nombre: "sala_juntas" },
  { id: 11, nombre: "secretaria" },
  { id: 12, nombre: "biblioteca_principal" },
  { id: 13, nombre: "ascensor_1" },
  { id: 14, nombre: "zona_recreacion_1" },
  { id: 15, nombre: "escaleras_2_piso1" },
  { id: 16, nombre: "escaleras_2_piso2" },
  { id: 17, nombre: "entrada_2_piso" },
  { id: 18, nombre: "salas_informatica" },
  { id: 19, nombre: "sefontev" },
  { id: 20, nombre: "ascensor_2" },
  { id: 21, nombre: "vive_digital" },
  { id: 22, nombre: "virtualteca" },
  { id: 23, nombre: "bloque_a_b" },
  { id: 24, nombre: "zona_recreacion_inter" },
  { id: 25, nombre: "bloque_p" },
  { id: 26, nombre: "plazoleta_elisabeth_escobar" },
  { id: 27, nombre: "bloque_i" },
  { id: 28, nombre: "acensor_bloque_p" },
  { id: 29, nombre: "escaleras_ab" },
  { id: 30, nombre: "ascensor_bloque_e" },
  { id: 31, nombre: "escaleras_secundarias_ab" },
  { id: 32, nombre: "zona_recreacion_papeleria" },
  { id: 33, nombre: "coordinacion_seguridad" },
  { id: 34, nombre: "bienestar_institucional" },
  { id: 35, nombre: "rampa_discapacitados" },
  { id: 36, nombre: "banos_administrativos" },
  { id: 37, nombre: "banos_segundo_piso" },
  { id: 38, nombre: "cooperativas_bicicletero" },
  { id: 39, nombre: "parqueadero_bicicleta" },
  { id: 40, nombre: "entrada_y_salida_de_bicicletas" },
  { id: 41, nombre: "parqueadero_de_carro" },
  { id: 42, nombre: "bloque_f" },
  { id: 43, nombre: "escaleras_bloque_d" },
  { id: 44, nombre: "carretera_carros" },
  { id: 45, nombre: "carretera_carros_h" },
  { id: 46, nombre: "fotocopiadora_tyson" },
  { id: 47, nombre: "zona_recreacion_2" },
  { id: 48, nombre: "bloque_h" },
  { id: 49, nombre: "unidad_de_emprendimiento_y_desarrollo_empresarial_upc" },
  { id: 50, nombre: "comedor" },
  { id: 51, nombre: "intercepcion_comedor" },
  { id: 52, nombre: "bancas_del_h" },
  { id: 53, nombre: "fotocopiadoras_del_bloque_h" },
  { id: 54, nombre: "ascensor_bloque_h" },
  { id: 55, nombre: "escaleras_del_bloque_h" },
  { id: 56, nombre: "parqueadero_de_motos" },
  { id: 57, nombre: "salida_parqueadero_motos" },
  { id: 58, nombre: "entrada_parqueadero_de_motos" },
  { id: 59, nombre: "oficina_arcadia" },
  { id: 60, nombre: "coordinacion_seguridad_y_salud_en_el_trabajo" },
  { id: 61, nombre: "cempre" },
  { id: 62, nombre: "gestion_documental" },
  { id: 63, nombre: "oficina_de_egresados" },
  { id: 64, nombre: "salida_de_emergencia_primer_piso" },
  { id: 65, nombre: "bienestar_institucional_2" },
  { id: 66, nombre: "oficina_de_permanencia" },
  { id: 67, nombre: "bienestar_universitario" },
  { id: 68, nombre: "banos_primer_piso" },
  { id: 69, nombre: "decanatura_de_ciencias_basicas_y_educacion" },
  { id: 70, nombre: "bancas_segundo_piso" },
  { id: 71, nombre: "decanatura_de_ciencias_administrativas_contables_y_economicas" },
  { id: 72, nombre: "salida_de_emergencia_segundo_piso" },
  { id: 73, nombre: "decanatura_de_ingenieria_y_tecnologia" },
  { id: 74, nombre: "decanatura_de_ciencias_de_la_salud" },
  { id: 75, nombre: "decanatura_de_derecho_y_ciencias_politicas" }
];
const sidebarStyle = {
  height: "75vh",
  width: "100%",
  padding: '10px',
  overflowY: 'auto',
  boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
};

export default MenuRutas;