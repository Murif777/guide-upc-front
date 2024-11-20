import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { CamService } from '../../services/CamService';
import SistemaRutas from './SistemaRutas';
import '../../assets/styles/WebCamCapture.css';

const WebcamCapture = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const startLocation = searchParams.get('start');
  const endLocation = searchParams.get('end');
  
  const webcamRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [detectionResults, setDetectionResults] = useState(null);
  const [qrData, setQrData] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  useEffect(() => {
    if (!startLocation || !endLocation) {
      console.log("nulos")  // Replace with your route
    }
  }, [startLocation, endLocation, navigate]);

  // Improved camera permission check for mobile and desktop
  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        // Solicitar acceso directamente
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        setHasCameraPermission(true);
      } catch (error) {
        console.error('Error al acceder a la cámara:', error);
        setErrorMessage('No se pudo acceder a la cámara. Por favor, verifica los permisos.');
      }
    };
  
    checkCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',  // Prefer front camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      // Stop the stream immediately after getting permission
      stream.getTracks().forEach(track => track.stop());
      
      setHasCameraPermission(true);
      setErrorMessage('');
    } catch (error) {
      console.error('Camera permission denied:', error);
      setErrorMessage('No se pudo acceder a la cámara. Por favor, verifica los permisos en la configuración del navegador.');
      setHasCameraPermission(false);
    }
  };
  
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
          
          // Handle color detection results
          if (results.colors) {
            setDetectionResults(results.colors);
          }

          // Handle QR code detection results
          if (results.qr_data) {
            setQrData(results.qr_data.join(', '));
            setMessage(results.message || 'QR code detectado');
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

  const renderDetectionResults = () => {
    return (
      <div className="detection-results mt-2 p-3 bg-white rounded-lg shadow-md">
        {/* Color Detection Results */}
        {detectionResults && (
          <>
            <h6 className="text-lg font-semibold mb-2">Resultados de Detección de Colores</h6>
            {Object.entries(detectionResults).map(([color, data]) => (
              <div key={color} className="flex justify-between border-b py-1">
                <span className="capitalize font-medium">{color}:</span>
                <span>
                  {data.detected ? 
                    `${data.count} ${data.count === 1 ? 'forma' : 'formas'}` : 
                    'No detectado'
                  }
                </span>
              </div>
            ))}
          </>
        )}

        {/* QR Code Results */}
        {qrData && (
          <div className="mt-2">
            <h6 className="text-lg font-semibold mb-2">Resultados de QR</h6>
            <div className="bg-yellow-100 text-yellow-700 p-2 rounded">
              QR Data: {qrData}
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Render permission denied message if no camera access
  if (!hasCameraPermission) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
        <div className="bg-red-100 text-red-700 p-6 rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold mb-4">Permiso de Cámara Requerido</h2>
          <p className="mb-4">
            Esta aplicación necesita acceso a la cámara para funcionar correctamente. 
            Haz clic en el botón para conceder permisos de cámara.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={requestCameraPermission}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Conceder Permiso de Cámara
            </button>
            <button
              onClick={handleGoBack}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Volver
            </button>
          </div>

          {errorMessage && (
            <div className="mt-4 p-2 bg-red-200 text-red-800 rounded">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
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
          <div className="webcam-overlay absolute top-0 left-0 w-full h-full">
            {isStreaming && renderDetectionResults()}
            {isStreaming && (
              <div className="detection-status absolute top-2 right-2 flex items-center">
                <div className="animate-pulse w-3 h-3 bg-red-500 rounded-full mr-2" />
                <span className="text-sm text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                  Detectando...
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              isStreaming
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isStreaming ? 'Detener Detección' : 'Iniciar Detección'}
          </button>
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
          >
            Volver
          </button>
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

        <div className="mt-4">
          <SistemaRutas startLocation={startLocation} endLocation={endLocation} />
        </div>
      </div>
    </div>
  );
};

export default WebcamCapture;