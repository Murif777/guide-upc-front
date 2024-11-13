import axios from 'axios';

export const getAuthToken = () => {
  const token = window.localStorage.getItem('auth_token');
  return token !== "null" ? token : null;
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
  console.log("Auth token:", authToken); // Log the token

  if (authToken !== null && authToken !== "null" && url !== '/register' && url !== '/login') {
    headers = { 'Authorization': `Bearer ${authToken}` };
    console.log("Setting Authorization header:", headers.Authorization);
  }

  return axios({
    method: method,
    url: url,
    headers: headers,
    data: data
  })
  .then(response => {
    console.log("Response received:", response);
    return response;
  })
  .catch(error => {
    console.error("Error in request:", error);
    if (error.response) {
      console.error("Error response:", error.response);
    }
    return { status: 'error' };
  });
};
