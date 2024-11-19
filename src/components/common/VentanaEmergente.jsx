import React, { useEffect } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';

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

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-lg shadow-xl relative"
        style={{ width: width, maxWidth: '90%', maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          {showCloseButton && (
            <CloseButton 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            />
          )}
        </div>
        
        {/* Content */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default VentanaEmergente;