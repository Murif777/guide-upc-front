import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { CamService } from '../../services/CamService';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [detectionResults, setDetectionResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  const CAPTURE_INTERVAL = 1000;
  
  useEffect(() => {
    let intervalId = null;

    const processFrame = async () => {
      if (webcamRef.current && isStreaming) {
        try {
          const imageSrc = webcamRef.current.getScreenshot();
          if (!imageSrc) return;

          // Convertir base64 a blob
          const base64Data = imageSrc.split(',')[1];
          const byteCharacters = atob(base64Data);
          const byteArrays = [];

          for (let i = 0; i < byteCharacters.length; i++) {
            byteArrays.push(byteCharacters.charCodeAt(i));
          }

          const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/png' });
          console.log('Sending blob:', blob); // Para debugging

          const results = await CamService.sendCam(blob);
          setDetectionResults(results);
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

  const toggleStreaming = () => {
    setIsStreaming(!isStreaming);
    if (!isStreaming) {
      setErrorMessage('');
    }
  };

  const renderDetectionResults = () => {
    if (!detectionResults) return null;

    return (
      <div className="mt-4 p-4 bg-gray-100 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Detecciones:</h3>
        {Object.entries(detectionResults).map(([color, data]) => (
          <div key={color} className="mb-2">
            <p className="capitalize">
              <span className="font-medium">{color}:</span>{' '}
              {data.detected ? (
                <>
                  {data.count} {data.count === 1 ? 'forma detectada' : 'formas detectadas'}
                  <span className="text-sm text-gray-600 ml-2">
                    {data.positions && `(Posiciones: ${JSON.stringify(data.positions)})`}
                  </span>
                </>
              ) : (
                'No detectado'
              )}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="relative w-full max-w-2xl">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/png"
          className="w-full rounded-lg shadow-lg"
          mirrored={true}
          videoConstraints={{
            width: 640,
            height: 480,
            facingMode: "user"
          }}
        />
        {isStreaming && (
          <div className="absolute top-2 right-2 flex items-center gap-2">
            <div className="animate-pulse w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-sm text-white bg-black bg-opacity-50 px-2 py-1 rounded">
              Detectando...
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-4">
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
      </div>

      {errorMessage && (
        <div className="w-full max-w-2xl p-4 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      {renderDetectionResults()}
    </div>
  );
};

export default WebcamCapture;