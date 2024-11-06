import { Form, FloatingLabel, Button} from 'react-bootstrap';
import { useState } from 'react';
import SistemaRutas from './SistemaRutas';

function MenuRutas() {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [submittedStart, setSubmittedStart] = useState(null);
  const [submittedEnd, setSubmittedEnd] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleRouteSearch = () => {
    // Solo busca la ruta si ambas ubicaciones están seleccionadas
    if (startLocation && endLocation) {
      setLoading(true);
      setTimeout(() => {
        setSubmittedStart(startLocation); // Guardar la ubicación de partida seleccionada
        setSubmittedEnd(endLocation); // Guardar la ubicación de destino seleccionada
        setLoading(false);
      }, 500); // Simula una solicitud de red
    }
  };

  return (
    <div style={sidebarStyle}>
      <h5>Opciones de ruta</h5>
      <div className="mb-3">
        <FormFloatingSelectExample value={startLocation} setValue={setStartLocation} />
      </div>
      <div className="mb-3">
        <FormFloatingSelectDestination value={endLocation} setValue={setEndLocation} />
      </div>
      <div className="mb-3">
        <Button variant="success" disabled={isLoading} onClick={!isLoading ? handleRouteSearch : null}>
          {isLoading ? 'Cargando...' : 'Buscar'}
        </Button>
        <Button variant="success">
          Usar camara
        </Button>
      </div>

      {/* Se pasa las ubicaciones seleccionadas a SistemaRutas solo después de hacer clic en "Buscar" */}
      <SistemaRutas startLocation={submittedStart} endLocation={submittedEnd} />
    </div>
  );
}

function FormFloatingSelect({ controlId, label, value, setValue, options }) {
  return (
    <FloatingLabel controlId={controlId} label={label}>
      <Form.Select
        aria-label={`Floating label select for ${label}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  );
}

const options = [
  { value: "", label: "Seleccione una opción" },
  { value: "A", label: "Bloque A" },
  { value: "B", label: "Bloque B" },
  { value: "C", label: "Bloque C" },
  { value: "D", label: "Bloque D" },
  { value: "E", label: "Bloque E" },
  { value: "F", label: "Bloque F" },
  { value: "G", label: "Bloque G" },
];

function FormFloatingSelectExample({ value, setValue }) {
  return <FormFloatingSelect controlId="floatingSelect" label="Seleccione lugar de partida" value={value} setValue={setValue} options={options} />;
}

function FormFloatingSelectDestination({ value, setValue }) {
  return <FormFloatingSelect controlId="floatingSelectDestination" label="Seleccione lugar de destino" value={value} setValue={setValue} options={options} />;
}

const sidebarStyle = {
  height: "40vh",
  width: "100%",
  padding: '20px',
  overflowY: 'auto',
  boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
};

export default MenuRutas;
