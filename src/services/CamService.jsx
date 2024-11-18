import { request } from '../helpers/axios_helper';

export const CamService = {
  sendCam: async (imageBlob) => {
    // Crear FormData
    const formData = new FormData();
    formData.append('image', imageBlob, 'capture.png');

    try {
      const response = await request(
        'post', 
        '/api/process-image', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log("Imagen procesada:", response.data);
      return response.data;
    } catch (error) {
      console.error('Error al procesar la imagen:', error);
      throw error;
    }
  }
};

export default CamService;