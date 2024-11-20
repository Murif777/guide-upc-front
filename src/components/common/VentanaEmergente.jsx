import React, { useEffect } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import { createPortal } from 'react-dom';

const VentanaEmergente = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  showCloseButton = true,
  width = "500px" 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'auto',
        paddingTop:'50px'
        
      }}
    >
      <div 
        className="bg-white rounded-lg shadow-xl relative"
        style={{ 
          width: width, 
          maxWidth: '90%', 
          maxHeight: '100vh',
          position: 'relative',
          margin: 'auto',
        }}
      >
        {/* Botón de cerrar */}
        {showCloseButton && (
          <div className="absolute p-lg-2">
            <CloseButton 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            />
          </div>
        )}
        
        {/* Header */}
        <div className=" text-center ">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        
        {/* Content */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(75vh - 80px)' }}>
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(
    modalContent,
    document.body
  );
};

export default VentanaEmergente;