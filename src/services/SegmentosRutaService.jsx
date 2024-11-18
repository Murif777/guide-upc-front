import { request } from '../helpers/axios_helper';

export const getSegmentos = async () => {
  try {
    const response = await request('get', '/api/segmentos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener segmentos', error);
    throw error;
  }
};

export const sendTestSegmento = async () => {
  const testSegmento = {
    lugarInicio: "A",
    lugarFin: "B",
    distancia: 10,
    direccion: "Norte"
  };
  try {
    const response = await request('post', '/api/segmentos', testSegmento);
    return response.data;
  } catch (error) {
    console.error('Error al enviar el segmento de prueba', error);
    throw error;
  }
};
