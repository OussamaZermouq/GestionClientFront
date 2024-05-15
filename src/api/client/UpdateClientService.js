import axios from '../Configuration/CustomAxiosConfig';
const BASE_URL = 'http://localhost:8080/api/v1/client/modifyClient/';


async function updateClient(idClient, newClient) {
    const TOKEN = localStorage.getItem('token');
    
    if (!TOKEN) {
        console.error('Token not found. Redirecting to login page...');
        return null;
    }
    try {
        const response = await axios.put(BASE_URL+idClient,newClient);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching clients:', error);
        return null;
    }
}

export default updateClient;