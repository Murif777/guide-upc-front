import axios from 'axios';

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
};

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method, url, data) => {
  let headers = {};
  const authToken = getAuthToken();

  // No enviar el header de autorización si la URL es /register
  if (authToken !== null && authToken !== "null" && url !== '/register'&& url !== '/login') {
      headers = { 'Authorization': `Bearer ${authToken}` };
  }

  return axios({
      method: method,
      url: url,
      headers: headers,
      data: data
  })
  .then(response => {
      return response; // Si la respuesta es exitosa, la retornamos
  })
  .catch(error => {
      console.error("Error en la solicitud:", error);
      // Maneja el error aquí, por ejemplo, mostrando un mensaje al usuario
      return { status: 'error' }; // Opcional: retorna un objeto con un estado 'error' si falla
  });
};
