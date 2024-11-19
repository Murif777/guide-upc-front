import { request} from '../helpers/axios_helper';

  export const getLugares = async () => {
    try {
      const response = await request('get', '/api/lugares'); 
      return response.data; 
    } catch (error) { 
      console.error('Error al obtener lugares', error); 
      throw error; 
    } 
  };
  export const updateLugarPic= async (id,foto) => {
    if (!id||id === 'undefined') {
      throw new Error('ID de lugar no válido');
    }
    const formData = new FormData();
    if (foto && foto instanceof File) {
      formData.append('foto', foto);
    }
    try {
      const response = await request(
        'PUT',
        `/api/lugares/pic/${encodeURIComponent(id)}`,
        formData,
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      );
      
      if (response && response.data) {
        console.log('Lugar actualizado:', response.data);
        return response.data;
      } else {
        throw new Error('No se recibieron datos en la respuesta');
      }
    } catch (error) {
      console.error('Error al actualizar el lugsr:', error);
      throw error; // Re-lanzamos el error para que sea manejado por el componente que llama
    }
  };
  export const sendTestLugar = async () => { 
    const testLugar = { 
      nombre: "Lugar de Prueba", 
      descripcion: "Descripción de prueba", 
      latitud: 10.451131944448289, 
      longitud: -73.2618933710878, 
      icono: "https://img.icons8.com/?size=100&id=XieTOK4V0QEI&format=png&color=000000", 
      foto: null 
    }; 
    try { 
      const response = await request('post', '/api/lugares', testLugar);
      return response.data; 
    } catch (error) { 
      console.error('Error al enviar el lugar de prueba', error);
      throw error; 
    } 
  };
  