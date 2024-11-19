import React, { useState, useEffect } from 'react';

const CompassLocalDev = () => {
  const [heading, setHeading] = useState(0);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState(null);
  const [lastPosition, setLastPosition] = useState(null);
  
  const getDirection = (degree) => {
    const directions = ['Norte', 'Noreste', 'Este', 'Sureste', 'Sur', 'Suroeste', 'Oeste', 'Noroeste'];
    const index = Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  useEffect(() => {
    let watchId;

    const startGPSCompass = () => {
      if ('geolocation' in navigator) {
        watchId = navigator.geolocation.watchPosition(
          (newPosition) => {
            setPosition(newPosition);
            
            // Calcular dirección basada en el cambio de posición
            if (lastPosition) {
              const lat1 = lastPosition.coords.latitude;
              const lon1 = lastPosition.coords.longitude;
              const lat2 = newPosition.coords.latitude;
              const lon2 = newPosition.coords.longitude;
              
              // Calcular bearing
              const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
              const x = Math.cos(lat1) * Math.sin(lat2) -
                      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
              const bearing = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
              
              setHeading(bearing);
            }
            
            setLastPosition(newPosition);
            setError(null);
          },
          (err) => {
            setError(`Error: ${err.message}`);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      } else {
        setError('Geolocalización no disponible');
      }
    };

    // Iniciar el seguimiento GPS
    startGPSCompass();

    // Limpieza
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [lastPosition]);

  // Interfaz de prueba
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {error ? (
        <div className="text-red-500">
          {error}
          <button 
            onClick={() => window.location.reload()}
            className="ml-2 p-2 bg-blue-500 text-white rounded"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <div className="text-center">
          <div style={{
            transform: `rotate(${heading}deg)`,
            transition: 'transform 0.5s ease-out',
            display: 'inline-block',
            fontSize: '2rem'
          }}>
            ⬆️
          </div>
          <div className="mt-2 text-lg font-semibold">
            {heading.toFixed(0)}° - {getDirection(heading)}
          </div>
          {position && (
            <div className="text-sm text-gray-500">
              Lat: {position.coords.latitude.toFixed(6)}<br/>
              Lon: {position.coords.longitude.toFixed(6)}<br/>
              Precisión: {position.coords.accuracy.toFixed(1)}m
            </div>
          )}
          <div className="mt-2 text-xs text-gray-400">
            Modo desarrollo (usando GPS)
          </div>
        </div>
      )}
    </div>
  );
};

export default CompassLocalDev;