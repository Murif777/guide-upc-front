import { useState, useEffect, useRef } from 'react';
import { Button} from 'react-bootstrap';
import { getSegmentos } from '../../services/SegmentosRutaService'; // Importa el servicio 
import Compass from './Compass';
const buildGraphFromSegments = (segments) => { 
  const graph = {}; 
    segments.forEach(segment => { 
      if (!graph[segment.lugarInicio]) { 
        graph[segment.lugarInicio] = {}; 
      } graph[segment.lugarInicio][segment.lugarFin] = { 
        distance: segment.distancia, 
        instructions: `Camina ${segment.distancia} metros hacia el ${segment.direccion}` 
      }; 
    }
  ); return graph; 
  
};

// Implementación de la cola de prioridad
class PriorityQueue {
  constructor() {
    this.collection = [];
  }

  enqueue(element, priority) {
    const queueElement = { element, priority };
    let added = false;
    for (let i = 0; i < this.collection.length; i++) {
      if (queueElement.priority < this.collection[i].priority) {
        this.collection.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }
    if (!added) {
      this.collection.push(queueElement);
    }
  }

  dequeue() {
    return this.collection.shift();
  }

  isEmpty() {
    return this.collection.length === 0;
  }
}

const dijkstra = (graph, start, end) => {
  if (!graph || Object.keys(graph).length === 0) {
    console.error("El grafo está vacío o no está definido");
    return { path: [], instructions: [] };
  }

  //console.log("Ejecutando Dijkstra en el grafo:", JSON.stringify(graph, null, 2)); // Mostrar el grafo en la consola

  const distances = {};
  const prev = {};
  const pq = new PriorityQueue();
  const instructions = {};

  distances[start] = 0;
  pq.enqueue(start, 0);

  Object.keys(graph).forEach(node => {
    if (node !== start) distances[node] = Infinity;
    prev[node] = null;
    instructions[node] = [];
  });

  while (!pq.isEmpty()) {
    const { element: current } = pq.dequeue();

    if (current === end) break;

    if (!graph[current]) {
      console.error("No se encontró el nodo en el grafo:", current);
      continue;
    }

    Object.keys(graph[current]).forEach(neighbor => {
      if (!graph[current][neighbor]) {
        console.error("No se encontró el vecino en el grafo:", neighbor, "para el nodo:", current);
        return;
      }
      const alt = distances[current] + graph[current][neighbor].distance;
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        prev[neighbor] = current;
        instructions[neighbor] = [...instructions[current], graph[current][neighbor].instructions];
        pq.enqueue(neighbor, alt);
      }
    });
  }

  const path = [];
  let u = end;
  while (prev[u]) {
    path.unshift(u);
    u = prev[u];
  }
  path.unshift(start);
  return { path, instructions: instructions[end] };
};


const SistemaRutas = ({ startLocation, endLocation }) => {
  const [segments, setSegments] = useState([]);
  const [graph, setGraph] = useState({});
  const [route, setRoute] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reading, setReading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const speechSynthesisRef = useRef(window.speechSynthesis);

  useEffect(() => {
    setIsLoading(true);
    getSegmentos()
      .then(data => {
        if (data && data.length > 0) {
          setSegments(data);
          const graphData = buildGraphFromSegments(data);
          setGraph(graphData);
          setError(null);
        } else {
          setError("No se obtuvieron segmentos del backend");
        }
      })
      .catch(error => {
        console.error('Error al obtener segmentos:', error);
        setError("Error al cargar los datos de rutas");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  

  // Efecto para calcular la ruta cuando cambian las ubicaciones o el grafo está listo
  useEffect(() => {
    if (graph && startLocation && endLocation && !isLoading) {
      handleRouteRequest(startLocation, endLocation);
    }
  }, [graph, startLocation, endLocation, isLoading]);

  const handleRouteRequest = (start, end) => {
    if (!graph || Object.keys(graph).length === 0) {
      setError("El grafo no está listo para calcular rutas");
      return;
    }

    try {
      const { path, instructions } = dijkstra(graph, start, end);
      if (path.length > 0) {
        setRoute(path);
        setInstructions(instructions);
        setCurrentStep(0);
        setIsPaused(true);
        setReading(false);
        setError(null);
      } else {
        setError("No se encontró una ruta entre los puntos seleccionados");
      }
    } catch (error) {
      console.error("Error al calcular la ruta:", error);
      setError("Error al calcular la ruta");
    }
  };
  if (isLoading) {
    return <div>Cargando datos de rutas...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }
  

  const speak = (text, nextStep) => {
    const isLastInstruction = currentStep === instructions.length - 1;
    const instructionText = isLastInstruction ? text : text + ". Presione siguiente para continuar.";
    const utterance = new SpeechSynthesisUtterance(instructionText);
    utterance.onend = () => {
      if (!isPaused && nextStep !== null) {
        setIsPaused(true); // Se pausa después de cada instrucción
      }
    };
    speechSynthesisRef.current.speak(utterance);
  };

  const handleStartReading = () => {
    setReading(true);
    setIsPaused(false);
    speak(instructions[0], 1);
  };

  const handlePause = () => {
    speechSynthesisRef.current.pause();
    setIsPaused(true);
  };

  const handleResume = () => {
    speechSynthesisRef.current.resume();
    setIsPaused(false);
  };

  const handleNext = () => {
    if (currentStep < instructions.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      speak(instructions[nextStep], nextStep + 1 < instructions.length ? nextStep + 1 : null);
    } else {
      speak("Llegó a su destino.", null);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      speak(instructions[prevStep], prevStep);
    }
  };

  return (
    <div>
      {route.length > 0 && (
        <>
          <div className="mb-4">
            <h5>Orientación actual:</h5>
            <Compass />
          </div>
          <h5>Ruta seleccionada:</h5>
          {!reading && <Button onClick={handleStartReading} variant="success" >
                Leer en voz alta
                </Button>}
          <p>{route.join(' -> ')}</p>
          <ul>
            {instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
          <div>
          <Button onClick={handlePrevious} disabled={currentStep === 0} variant="success" className="me-1">
                Repetir
            </Button>
            <Button onClick={handlePrevious} disabled={currentStep === 0} variant="success" className="me-1">
                Anterior
            </Button>
            <Button onClick={isPaused ? handleResume : handlePause} variant="success" className="me-1">
              {isPaused ? "Reanudar" : "Pausar"}
            </Button>
            <Button onClick={handleNext} disabled={currentStep === instructions.length - 1 && !isPaused} variant="success">
                Siguiente
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
export default SistemaRutas;
