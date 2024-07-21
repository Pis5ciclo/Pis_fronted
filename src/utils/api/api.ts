import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
    throw new Error('Failed Connection');
}
const createHeaders = (token = "NONE") => {
    let headers = {
        "Accept": "application/json",
        "Content-type": "application/json"
    };
    if (token !== "NONE") {
        headers["X-Access-Token"] = token;
    }
    return headers;
};

const login = async (data, token = "NONE") => {
    const headers = createHeaders(token)
    const response = await axios.post(`${apiUrl}/login`, data, { headers });
    return response.data;
};
const listSensor = async (token = "NONE") => {
    const headers = createHeaders(token);
    try {
        const response = await axios.get(`${apiUrl}/list_sensor`, { headers });
        return Array.isArray(response.data.data) ? response.data.data : [];
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
              window.location.href = '/404'; // Redirige a /404 si es un error de autorización
            } else {
              window.location.href = '/status/500'; // Redirige a /status/500 para otros errores
            }
          } else {
            console.error('Error de red o del servidor:', error.message);
            window.location.href = '/status/500'; // También redirige a /status/500 para errores sin respuesta de servidor
          }
          return []; // Devuelve un array vacío en caso de error para manejarlo en el componente
    }
};
const listDataSensor = async (token = 'NONE') => {
    const headers = createHeaders(token);
    try {
      const response = await axios.get(`${apiUrl}/data/sensor`, { headers });
      return Array.isArray(response.data.data) ? response.data.data : [];
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          window.location.href = '/404'; // Redirige a /404 si es un error de autorización
        } else {
          window.location.href = '/status/500'; // Redirige a /status/500 para otros errores
        }
      } else {
        console.error('Error de red o del servidor:', error.message);
        window.location.href = '/status/500'; // También redirige a /status/500 para errores sin respuesta de servidor
      }
      return []; // Devuelve un array vacío en caso de error para manejarlo en el componente
    }
  };
const listSensorName = async (token = "NONE") => {
    const headers = createHeaders(token);
    try {
        const response = await axios.get(`${apiUrl}/sensor/list_sensor_name`, { headers });
        return Array.isArray(response.data.data) ? response.data.data : [];
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
              window.location.href = '/404'; // Redirige a /404 si es un error de autorización
            } else {
              window.location.href = '/status/500'; // Redirige a /status/500 para otros errores
            }
          } else {
            console.error('Error de red o del servidor:', error.message);
            window.location.href = '/status/500'; // También redirige a /status/500 para errores sin respuesta de servidor
          }
          return []; // Devuelve un array vacío en caso de error para manejarlo en el componente
    }
};

const listPerson = async (token = "NONE") => {
    const headers = createHeaders(token);
    try {
        const response = await axios.get(`${apiUrl}/person/account`, { headers });
        return Array.isArray(response.data.data) ? response.data.data : [];
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
              window.location.href = '/404'; // Redirige a /404 si es un error de autorización
            } else {
              window.location.href = '/status/500'; // Redirige a /status/500 para otros errores
            }
          } else {
            console.error('Error de red o del servidor:', error.message);
            window.location.href = '/status/500'; // También redirige a /status/500 para errores sin respuesta de servidor
          }
          return []; // Devuelve un array vacío en caso de error para manejarlo en el componente
    }
};

const roles = async (token = "NONE") => {
    const headers = createHeaders(token);
    const response = await axios.get(`${apiUrl}/roles`, { headers });
    return response.data.data;
}

const saveUser = async (data, token = "NONE") => {
    const headers = createHeaders(token);
    const response = await axios.post(`${apiUrl}/person/save`, data, { headers });
    return response.data;
}

const saveSensor = async (data, token: string) => {
    const headers = createHeaders(token);
    try {
        const response = await axios.post(`${apiUrl}/sensor/save`, data, { headers });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Error en la conexión al servidor');
        }
    }
}

const updateUser = async (data: any, external_id:string, token = "NONE") => {
    const headers = createHeaders(token);
    const response = await axios.post(`${apiUrl}/modify_person/${external_id}`, data, { headers });
    return response.data;
}

const desactivateAccount = async (external_id:string, token = "NONE") => {
    const headers = createHeaders(token);
    const response = await axios.get(`${apiUrl}/deactivate_person/${external_id}`, { headers });
    return response.data;
}

const updateSensor = async (data: any, external_id:string, token: string) => {
    const headers = createHeaders(token);
    try {
        const response = await axios.post(`${apiUrl}/modify_sensor/${external_id}`, data, { headers });
        return response.data;
    } catch (error) {
        console.error('Error updating sensor:', error);
        throw error;
    }
}

const desactivateSensor = async (external_id:string, token: string) => {
    const headers = createHeaders(token);
    const response = await axios.get(`${apiUrl}/sensor/status/${external_id}`, { headers });
    return response.data;
}

const types = async (token: string) => {
    const headers = createHeaders(token);
    const response = await axios.get(`${apiUrl}/types`, { headers });
    return response.data;
}

const api ={
    login,
    listSensor,
    listPerson,
    roles,
    saveUser,
    saveSensor,
    updateUser,
    desactivateAccount,
    listSensorName,
    listDataSensor,
    types,
    desactivateSensor,
    updateSensor,
}
export default api