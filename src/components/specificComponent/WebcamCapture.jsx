import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { CamService } from '../../services/CamService';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [detectionResults, setDetectionResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let stopStream = null;

    const startDetection = async () => {
      if (isStreaming) {
        try {
          stopStream = await CamService.startStream((results) => {
            setDetectionResults(results);
            setErrorMessage('');
          });
        } catch (error) {
          setErrorMessage('Error al iniciar la detección: ' + error.message);
          setIsStreaming(false);
        }
      }
    };

    startDetection();

    // Cleanup
    return () => {
      if (stopStream) {
        stopStream();
      }
    };
  }, [isStreaming]);

  const toggleStreaming = () => {
    setIsStreaming(!isStreaming);
  };

  // Función para renderizar los resultados de detección
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
        />
        {isStreaming && (
          <div className="absolute top-2 right-2">
            <div className="animate-pulse w-3 h-3 bg-red-500 rounded-full" />
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={toggleStreaming}
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