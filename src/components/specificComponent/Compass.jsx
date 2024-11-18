import React, { useState, useEffect } from 'react';

const Compass = () => {
  const [heading, setHeading] = useState(0);
  const [error, setError] = useState(null);
  const [isAndroid, setIsAndroid] = useState(false);
  
  const getDirection = (degree) => {
    const directions = ['Norte', 'Noreste', 'Este', 'Sureste', 'Sur', 'Suroeste', 'Oeste', 'Noroeste'];
    const index = Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };
  
  useEffect(() => {
    let mounted = true;

    // Detectar si es Android
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroidDevice = /android/.test(userAgent);
    setIsAndroid(isAndroidDevice);

    // Función para manejar cambios en la orientación
    const handleOrientation = (event) => {
      if (!mounted) return;
      
      let headingValue;
      
      if (isAndroidDevice) {
        // En Android, alpha va de 0 a 360 en sentido horario desde el norte
        headingValue = event.alpha;
        // Ajustar el valor para que 0 sea el norte
        if (event.alpha !== null) {
          headingValue = 360 - event.alpha;
        }
      } else {
        // En iOS y otros
        headingValue = event.webkitCompassHeading || 360 - event.alpha;
      }
      
      if (typeof headingValue === 'number' && !isNaN(headingValue)) {
        setHeading(headingValue);
        setError(null);
      }
    };

    const handleMotion = (event) => {
      // Usar el acelerómetro para mejorar la precisión
      if (event.accelerationIncludingGravity) {
        // La lógica del acelerómetro se puede implementar aquí si es necesario
      }
    };

    // Función para iniciar la brújula
    const startCompass = async () => {
      if (!mounted) return;

      try {
        // Verificar si el dispositivo soporta la orientación
        if (!window.DeviceOrientationEvent) {
          throw new Error('Tu dispositivo no soporta la brújula');
        }

        if (isAndroidDevice) {
          // En Android, simplemente agregar los listeners
          window.addEventListener('deviceorientationabsolute', handleOrientation, true);
          window.addEventListener('deviceorientation', handleOrientation, true);
          window.addEventListener('devicemotion', handleMotion, true);
        } else {
          // Para iOS y otros dispositivos
          if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            const permission = await DeviceOrientationEvent.requestPermission();
            if (permission !== 'granted') {
              throw new Error('Permiso denegado para acceder a la brújula');
            }
          }
          window.addEventListener('deviceorientation', handleOrientation, true);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error al iniciar la brújula:', err);
      }
    };

    // Botón para iniciar la brújula
    const startButton = (
      <button 
        onClick={startCompass}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Iniciar Brújula
      </button>
    );

    startCompass();

    // Limpieza
    return () => {
      mounted = false;
      if (isAndroidDevice) {
        window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
        window.removeEventListener('deviceorientation', handleOrientation, true);
        window.removeEventListener('devicemotion', handleMotion, true);
      } else {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, []);

  const arrowStyle = {
    transform: `rotate(${heading}deg)`,
    transition: 'transform 0.5s ease-out',
    display: 'inline-block',
    fontSize: '2rem'
  };

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
          <div style={arrowStyle}>⬆️</div>
          <div className="mt-2 text-lg font-semibold">
            {heading.toFixed(0)}° - {getDirection(heading)}
          </div>
          <div className="text-sm text-gray-500">
            {isAndroid ? 'Dispositivo Android' : 'Dispositivo iOS/Otro'}
          </div>
        </div>
      )}
    </div>
  );
};

export default Compass;