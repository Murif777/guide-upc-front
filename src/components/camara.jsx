import React, { useRef, useEffect } from 'react';

const ColorDetector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const onOpenCvReady = () => {
      console.log('OpenCV.js está listo');

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      const colorButton = buttonRef.current;

      // Acceso a la cámara
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
        video.play();
      });

      const detectColor = () => {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const frame = context.getImageData(0, 0, video.videoWidth, video.videoHeight);
        const data = frame.data;
        let colorDetected = false;

        // Color objetivo y tolerancia
        const targetColor = { r: 184, g: 14, b: 10 };
        const tolerance = 50;

        // Recorre cada píxel
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Verificar si el color está dentro del rango de tolerancia
          if (
            Math.abs(r - targetColor.r) <= tolerance &&
            Math.abs(g - targetColor.g) <= tolerance &&
            Math.abs(b - targetColor.b) <= tolerance
          ) {
            colorDetected = true;
            break;
          }
        }

        if (colorDetected) {
          colorButton.style.backgroundColor = 'green';
        } else {
          colorButton.style.backgroundColor = 'red';
        }
      };

      // Ejecutar detección de color cada 100ms
      const intervalId = setInterval(detectColor, 100);

      // Cleanup function
      return () => clearInterval(intervalId);
    };

    // Asegúrate de que OpenCV.js esté cargado antes de ejecutar onOpenCvReady
    if (typeof cv !== 'undefined') {
      onOpenCvReady();
    } else {
      // Si OpenCV.js aún no está cargado, espera a que se cargue
      window.onOpenCvReady = onOpenCvReady;
    }
  }, []);

  return (
    <div>
      <h1>Detección de Color</h1>
      <video ref={videoRef} width="0" height="0" autoPlay></video>
      <canvas ref={canvasRef} width="640" height="480"></canvas>
      <button ref={buttonRef}>Estado del Color</button>
    </div>
  );
};

export default ColorDetector;
