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
  const sistemaRutasRef = useRef(null);
  
  const [isStreaming, setIsStreaming] = useState(false);
  const [qrData, setQrData] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
              const stepVerified = handleRouteQRVerification(detectedQrData);
              
              if (stepVerified) {
                setMessage(`Verificado: ${detectedQrData}`);
                // Optional: Automatically trigger next step or read instruction
                // sistemaRutasRef.current.handleNext();
              } else {
                setMessage(`QR no corresponde a la ruta actual${detectedQrData}`);
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

  const handleGoBack = () => {
    navigate(-1);
  };

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
            {isStreaming && (
              <div className="qr-data-container bg-yellow-100 text-yellow-700 p-2 rounded">
                QR Data: {qrData}
              </div>
            )}
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
          <SistemaRutas 
            ref={sistemaRutasRef}
            startLocation={startLocation} 
            endLocation={endLocation} 
          />
        </div>
      </div>
    </div>
  );
};

export default WebcamCapture;