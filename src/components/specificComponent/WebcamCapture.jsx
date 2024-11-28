import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { CamService } from '../../services/CamService';
import SistemaRutas from './SistemaRutas';
import VentanaEmergente from '../common/VentanaEmergente';
import NavigationControls from '../common/NavigationControls';
import '../../assets/styles/WebCamCapture.css';

const WebcamCapture = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const startLocation = searchParams.get('start');
  const endLocation = searchParams.get('end');

  const webcamRef = useRef(null);
  const sistemaRutasRef = useRef(null);
  
  const [isStreaming, setIsStreaming] = useState(false);
  const [qrData, setQrData] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showTutorial, setShowTutorial] = useState(() => { 
    return localStorage.getItem('camguideTutorialVisto') !== 'true'; 
    }
  );   
  //const [currentRouteStep, setCurrentRouteStep] = useState(0);

  const CAPTURE_INTERVAL = 1000;

  useEffect(() => {
    let intervalId = null;
    const processFrame = async () => {
      if (webcamRef.current && isStreaming) {
        try {
          const imageSrc = webcamRef.current.getScreenshot();
          if (!imageSrc) return;

          const base64Data = imageSrc.split(',')[1];
          const byteCharacters = atob(base64Data);
          const byteArrays = [];

          for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
          }

          const blob = new Blob(byteArrays, { type: 'image/png' });
          const results = await CamService.sendCam(blob);

          // Handle QR code detection results
          if (results.qr_data) {
            const detectedQrData = results.qr_data.join(', ').toLowerCase();
            setQrData(detectedQrData);

            // Route verification logic
            if (sistemaRutasRef.current) {
              const { route, handleRouteQRVerification } = sistemaRutasRef.current;
              
              // Check if the QR matches the current route step
              const stepVerified = handleRouteQRVerification(detectedQrData,setIsStreaming);
              
              if (stepVerified) {
                setMessage(`Verificado: ${detectedQrData}`);
                // Optional: Automatically trigger next step or read instruction
                // sistemaRutasRef.current.handleNext();
              } else {
                //setMessage(`QR no corresponde a la ruta actual${detectedQrData}`);
              }
            }
          } else {
            setQrData('');
            setMessage('');
          }

          setErrorMessage('');
        } catch (error) {
          console.error('Error processing frame:', error);
          setErrorMessage('Error al procesar el frame: ' + error.message);
        }
      }
    };

    if (isStreaming) {
      intervalId = setInterval(processFrame, CAPTURE_INTERVAL);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isStreaming]);


  const handleCloseTutorial = () => { 
    setShowTutorial(false); 
    localStorage.setItem('camguideTutorialVisto', 'false'); 
  };
  
  const TutorialContent = () => {
    const handleStartNavigation = () => {
      setIsStreaming(true);
      setShowTutorial(false);
    };
    return(
    <div className="space-y-4">
      <div className="mb-4">
        <button
          onClick={handleStartNavigation}
           className='px-4 py-2 rounded font-medium transition-colors er'
          >
            Omitir tutorial y empezar
        </button>
        <h3 className="text-lg font-semibold mb-2">¡Bienvenido al Sistema de Navegación del Campus!</h3>
        <p>Este sistema te ayudará a moverte de manera precisa y segura por el campus universitario utilizando tecnología de realidad aumentada.</p>
      </div>
      
      <div className="mb-4">
        <h4 className="font-semibold">Cómo Funciona</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>La navegación se realiza mediante un sistema de checkpoints y guía por cámara</li>
          <li>Cada ruta está compuesta por múltiples puntos de verificación en el campus conectados mediantes caminos predefinidos </li>
          <li>Utilizarás la cámara de tu dispositivo para escanear y confirmar cada checkpoint por lo cual es importante que trates
             de mantener el telefono posicionado de tal manera que la camara trasera señale al piso</li>
        </ul>
      </div>
  
      <div className="mb-4">
        <h4 className="font-semibold">Pasos para Navegar</h4>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Iniciar la detección con el botón "Empezar" ubicado al final del tutorial</li>
          <li>Posiciónate en el primer checkpoint de la ruta</li>
          <li>Escanea el código QR del checkpoint con la cámara</li>
          <li>Sigue las instrucciones de audio proporcionadas</li>
        </ol>
      </div>
  
      <div className="mb-4">
        <h4 className="font-semibold">Puntos Importantes</h4>
        <p className="text-red-600 font-medium">
          Para comenzar la navegación, es <strong>NECESARIO</strong> estar físicamente en el checkpoint del lugar seleccionado como punto de partida. 
          La cámara escaneará este punto para iniciar la guía precisa por el campus.
          Por lo que necesitas pedir ayuda para llegar a un chechpoint
        </p>
        <p>
          Se recomienda el uso de audifonos para mejor experiencia al usar esta funcionalidad
        </p>
      </div>
  
      <div className="mb-4">
        <h4 className="font-semibold">Instrucciones Finales</h4>
        <p>Una vez hayas entendido el funcionamiento del sistema y estés en el punto de partida correcto, 
           presiona el botón "Empezar" para comenzar tu navegación.
        </p>
        <button
            onClick={handleStartNavigation}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              isStreaming
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Empezar
          </button>
      </div>
    </div>
    );
  };
return (
  <>
    <VentanaEmergente
        isOpen={showTutorial}
        onClose={handleCloseTutorial}
        title="Tutorial - Guia por camara"
        width="600px"
      >
        <TutorialContent />
      </VentanaEmergente> 

      <NavigationControls 
        setShowTutorial={setShowTutorial} 
        tutorialKey="camguideTutorialVisto" 
      />

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-4">
      <div className="webcam-container w-full max-w-md">
        <div className="relative mb-4">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/png"
            className="w-full rounded-lg shadow-lg"
            mirrored={true}
            videoConstraints={{
              width: 350,
              height: 560,
              facingMode: "user"
            }}
          />
          <div className="webcam-overlay absolute top-0 left-0 w-full h-full flex flex-col">
            {isStreaming && (
              <div className="detection-status absolute top-2 right-2 flex items-center">
                <div className="animate-pulse w-3 h-3 bg-red-500 rounded-full mr-2" />
                <span className="text-sm text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                  Detectando...
                  QR Data: {qrData}
                </span>
              </div>
            )}
            
            {/* Mueve el contenedor de ruta al final (bottom) */}
            <div className="mt-auto ">
              <div className="ruta-container bg-white bg-opacity-50 p-2 rounded ">
                <SistemaRutas
                  ref={sistemaRutasRef}
                  startLocation={startLocation}
                  endLocation={endLocation}
                  hidenitem={true}
                />
              </div>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded text-center">
            {errorMessage}
          </div>
        )}

        {message && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded text-center">
            {message}
          </div>
        )}

        <div className="mt-4"></div>
      </div>
    </div>
    </>
  );
};

export default WebcamCapture;