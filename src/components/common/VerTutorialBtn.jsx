import React from 'react';
import { Button } from 'react-router-bootstrap';

const VerTutorialBtn = ({ setShowTutorial, tutorialKey }) => {
  const handleShowTutorial = () => {
    setShowTutorial(true);
    localStorage.setItem(tutorialKey, 'false');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center',}}>
      <img
        src="http://localhost:8080/uploads/1732070979978-536405f4-fc40-4792-9ad1-52861903ad42.png"
        alt="Mostrar Tutorial"
        onClick={handleShowTutorial}
        style={{ 
          cursor: 'pointer',
          height:'50px',
          width:'50px',
          marginRight: '10px' // Espacio entre la imagen y el texto
        }}
      />
      <span 
        onClick={handleShowTutorial} 
        style={{ cursor: 'pointer', fontSize: '16px', color: '#435a6d', }}
      >
        Ver tutorial
      </span>
    </div>
  );
};

export default VerTutorialBtn;
