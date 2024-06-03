import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// export const POST = async (resource, data, token="NONE") => {
//     let headers = {
//         "Accept": "application/json",
//         "Content-type": "application/json"
//     }
//     if (token != "NONE") {
//         headers = {
//             headers: {
//                 "Accept": "application/json",
//                 "X-Access-Token": token,
//             }
//         }
//     }
//     return await axios.post(URL + resource, data, headers)
// }
if (!apiUrl) {
    throw new Error('Failed Connection');
}

const login = async (datos) => {
    try {
        const response = await axios.post(`${apiUrl}/session`, datos);
        return response.data;
    } catch (error) {
        throw new Error('Error al registrar usuario: ' + error.message);
    }
}

const api ={
    login
}
export default api