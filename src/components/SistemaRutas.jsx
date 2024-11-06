import { useState, useEffect, useRef } from 'react';
import { Button} from 'react-bootstrap';
const graph = {
  A: { B: { distance: 10, instructions: "Camina 10 metros hacia el norte" }, C: { distance: 15, instructions: "Camina 15 metros hacia el este" } },
  B: { A: { distance: 10, instructions: "Camina 10 metros hacia el sur" }, D: { distance: 12, instructions: "Camina 12 metros hacia el oeste" } },
  C: { A: { distance: 15, instructions: "Camina 15 metros hacia el oeste" }, D: { distance: 10, instructions: "Camina 10 metros hacia el norte" } },
  D: { B: { distance: 12, instructions: "Camina 12 metros hacia el este" }, C: { distance: 10, instructions: "Camina 10 metros hacia el sur" }, E: { distance: 5, instructions: "Camina 5 metros hacia el norte" } },
  E: { D: { distance: 5, instructions: "Camina 5 metros hacia el sur" }, F: { distance: 8, instructions: "Camina 8 metros hacia el este" } },
  F: { E: { distance: 8, instructions: "Camina 8 metros hacia el oeste" }, G: { distance: 7, instructions: "Camina 7 metros hacia el norte" } },
  G: { F: { distance: 7, instructions: "Camina 7 metros hacia el sur" } }
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

    Object.keys(graph[current]).forEach(neighbor => {
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
  const [route, setRoute] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reading, setReading] = useState(false);
  const speechSynthesisRef = useRef(window.speechSynthesis);

  useEffect(() => {
    if (startLocation && endLocation) {
      handleRouteRequest(startLocation, endLocation);
    }
  }, [startLocation, endLocation]);

  const handleRouteRequest = (start, end) => {
    const { path, instructions } = dijkstra(graph, start, end);
    setRoute(path);
    setInstructions(instructions);
    setCurrentStep(0);
    setIsPaused(true);
    setReading(false);
  };

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
