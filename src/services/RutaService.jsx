import { request } from '../helpers/axios_helper';

export const getRutasByUsuario = async (usuarioId) => {
  try {
    const response = await request('get', `/api/rutas/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener rutas', error);
    throw error;
  }
};

export const sendRuta = async (usuarioId, lugarPartida, lugarLlegada) => {
  const ruta = {
    usuario: { id: usuarioId },
    lugarPartida: lugarPartida,
    lugarLlegada: lugarLlegada
  };
  try {
    const response = await request('post', '/api/rutas/save', ruta);
    console.log("Ruta enviada:", ruta);
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};
