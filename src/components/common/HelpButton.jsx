import React, { useState } from 'react';
import VentanaEmergente from './VentanaEmergente';
import { Button } from 'react-bootstrap';
import { sendTelegramNotification } from '../../services/UsuarioService';
import { getServer } from '../../helpers/axios_helper';
const HelpButton = () => {
    const [showHelpModal, setShowHelpModal] = useState(false);
  const handleNecesitoAyuda = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        
        try {
          await sendTelegramNotification(googleMapsLink);
          alert('Notificación enviada exitosamente');
        } catch (error) {
          console.error('Error enviando notificación:', error);
          alert('No se pudo enviar la notificación');
        }
      }, (error) => {
        console.error('Error getting location:', error);
        alert('No se pudo obtener la ubicación');
      });
    } else {
      alert('Geolocalización no soportada');
    }
  };


  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center',}}>
      <img
        src= {`http://${getServer()}:8080/uploads/1732203038765-4ea3efec-774e-41ac-ab22-bb17e14c758c.png`}
        alt="Mostrar Tutorial"
        onClick={() => setShowHelpModal(true)}
        style={{ 
          cursor: 'pointer',
          height:'50px',
          width:'50px',
          marginRight: '10px' // Espacio entre la imagen y el texto
        }}
      />
      <span 
        onClick={() => setShowHelpModal(true)}
        style={{ cursor: 'pointer', fontSize: '16px', color: '#435a6d', }}
      >
        ¿Necesitas ayuda?
      </span>
    </div>
      <VentanaEmergente
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        title="Solicitud de Ayuda"
        width="400px"
      >
        <div className="space-y-4 text-center">
          <p>¿Necesitas ayuda? Presiona el botón "Necesito Ayuda" para enviar una notificación.</p>
          <Button 
            variant="primary" 
            onClick={() => {
              setShowHelpModal(false);
              handleNecesitoAyuda();
            }}
          >
            Necesito Ayuda
          </Button>
        </div>
      </VentanaEmergente>
    </>
  );
};

export default HelpButton;