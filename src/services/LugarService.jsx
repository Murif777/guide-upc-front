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
  