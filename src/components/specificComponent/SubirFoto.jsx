import React, { useState } from 'react';
import { uploadPhoto } from '../../services/PhotoService'; // Asegúrate de actualizar la ruta según corresponda

const PhotoUploadComponent = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Por favor, selecciona una foto primero.');
      return;
    }

    try {
      const response = await uploadPhoto(file);
      setMessage(response);
    } catch (error) {
      setMessage('Error al subir la foto.');
      console.error(error);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Subir Foto</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PhotoUploadComponent;
