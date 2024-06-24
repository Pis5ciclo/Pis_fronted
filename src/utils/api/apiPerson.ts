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

const listPerson = async () => {
    let headers = {
        "Accept": "application/json",
        "Content-type": "application/json"
    };
    const response = await axios.get(`${apiUrl}/person/account`, { headers });
    console.log(response.data);

    return Array.isArray(response.data.data) ? response.data.data : [];
};

const searchUser = async (attribute: any, token = "NONE") => {
    const headers = createHeaders(token);
    const response = await axios.get(`${apiUrl}/search/person/${attribute}`, {headers});
    return Array.isArray(response.data.data) ? response.data.data: [];

}

const api = {
    listPerson,
    searchUser
}
export default api