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
        if (error.response && error.response.status === 401) {
            window.location.href = '/404'; 
        }
    }
};
const listDataSensor  = async (token = "NONE") => {
    const headers = createHeaders(token);
    try{
        const response = await axios.get(`${apiUrl}/data/sensor`, { headers });
        return Array.isArray(response.data.data) ? response.data.data: [];
    } catch (error) {
        if (error.response && error.response.status == 401) {
            window.location.href = '/404';
        }
    }

};
const listSensorName = async (token = "NONE") => {
    const headers = createHeaders(token);
    try {
        const response = await axios.get(`${apiUrl}/sensor/list_sensor_name`, { headers });
        return Array.isArray(response.data.data) ? response.data.data : [];
    } catch (error) {
        if (error.response && error.response.status === 401) {
            window.location.href = '/404'; 
        }
    }
};

const listPerson = async (token = "NONE") => {
    const headers = createHeaders(token);
    try {
        const response = await axios.get(`${apiUrl}/person/account`, { headers });
        return Array.isArray(response.data.data) ? response.data.data : [];
    } catch (error) {
        if (error.response && error.response.status === 401) {
            window.location.href = '/404'; 
        }
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
    listDataSensor
}
export default api