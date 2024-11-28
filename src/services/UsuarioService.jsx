import { request, setAuthHeader } from '../helpers/axios_helper';

  export const SubmitLogin = async (login, contraseña, navigate, onError) => {
  try {
    const response = await request(
      "POST",
      "/login",
      { login, contraseña }
    );

    if (response.data && response.data.token) {
      setAuthHeader(response.data.token);
      navigate('/inicio');
    } else {
      onError("Error al iniciar sesión");
    }
  } catch (error) {
    setAuthHeader(null);
    
    if (error.response) {
      if (error.response.status === 401) {
        onError("Correo electrónico o contraseña inválidos");
      } else if (error.response.status === 404) {
        onError("Usuario no encontrado");
      } else {
        onError("Error al conectar con el servidor");
      }
    } else if (error.request) {
      onError("Correo electrónico o contraseña inválidos");
    } else {
      onError("Error inesperado al iniciar sesión");
    }
  }
};

export const SubmitRegister = async (id, nombre, apellido, login, contraseña, navigate) => {
  const formData = {
    id,
    nombre,
    apellido,
    login,
    contraseña,
    foto: null 
  };
  request(
    "POST",
    "/register",
    formData
  ).then(
    (response) => {
      console.log(response.data);
      console.log(formData);
      navigate('/inicio'); 
    }).catch(
    (error) => {
      console.error("Error en la solicitud:", error);
      if (error.response && error.response.data) {
        console.error(error.response.data);
      }
      setAuthHeader(null);
    }
  );
};

export const getProfile = async () => {
  console.log('Fetching user profile...');
  try {
    const response = await request('GET', '/profile');
    console.log('Profile response:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Error fetching profile:', error);
    if (error.response && error.response.status === 404) {
      console.error('Perfil no encontrado.');
    } else if (error.response && error.response.status === 401) {
      console.error('No autorizado. Redirigiendo al login...');
      return null;
    } else {
      console.error('Error desconocido al obtener el perfil del usuario');
    }
    return null;
  }
};

export const updateUserProfile = async (login, id, nombre, apellido,foto) => {
  if (!id||id === 'undefined') {
    throw new Error('ID de usuario no válido');
  }
  const formData = new FormData();
  formData.append('id', id);
  formData.append('nombre', nombre);
  formData.append('apellido', apellido);
  if (foto && foto instanceof File) {
    formData.append('foto', foto);
  }

  try {
    const response = await request(
      'PUT',
      `/update/${encodeURIComponent(login)}`,
      formData,
      {
        headers: {
          // No establecemos Content-Type aquí - axios lo establecerá automáticamente con el boundary para FormData
          'Accept': 'application/json'
        }
      }
    );
    
    if (response && response.data) {
      console.log('Perfil actualizado:', response.data);
      return response.data;
    } else {
      throw new Error('No se recibieron datos en la respuesta');
    }
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    throw error; // Re-lanzamos el error para que sea manejado por el componente que llama
  }
};

export const updatePassword = async (login, oldPassword, newPassword, navigate) => { 
  const formData = { 
    login, 
    oldPassword, 
    newPassword 
  }; 
  try { 
    const response = await request( 
      'PUT', 
      '/update-password', 
      formData 
    ); 

    console.log('Contraseña actualizada:', response.data); 
    navigate('/inicio');
    return response.data; 
  } catch (error) { 
    console.error('Error al actualizar la contraseña:', error); 
    throw error; // Re-lanzamos el error para que sea manejado por el componente que llama 
  } 
};

export const sendTelegramNotification = (location) => {
  return request('POST', '/api/telegram/send', { location });
};