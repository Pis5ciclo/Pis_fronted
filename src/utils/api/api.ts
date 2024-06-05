import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
    throw new Error('Failed Connection');
}

const login = async (data, token = "NONE") => {
    let headers = {
        "Accept": "application/json",
        "Content-type": "application/json"
    };
    if (token !== "NONE") {
        headers["X-Access-Token"] = token;
    }
    const response = await axios.post(`${apiUrl}/login`, data, { headers });
    return response.data;
};
const listSensor = async () => {
    let headers = {
        "Accept": "application/json",
        "Content-type": "application/json"
    };
    const response = await axios.get(`${apiUrl}/list_sensor`, { headers });
    console.log(response.data);
    
    return Array.isArray(response.data.data) ? response.data.data : [];
};
const api ={
    login,
    listSensor
}
export default api