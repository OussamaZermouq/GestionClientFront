import axios from '../Configuration/CustomAxiosConfig';
const BASE_URL = 'http://localhost:8080/api/v1/client/addClient';


async function ajouterClient(client) {
    const TOKEN = localStorage.getItem('token');
    
    if (!TOKEN) {
        console.error('Token not found. Redirecting to login page...');
        return null;
    }

    try {
        const response = await axios.post(BASE_URL, client);
        return response.status;
    } catch (error) {
        console.error('Error sending the request :', error);
        return null;
    }
}


export default ajouterClient;