import axios from '../Configuration/CustomAxiosConfig';
const BASE_URL = 'http://localhost:8080/api/v1/commande/deleteComande/';


async function deleteCommande(id) {
    const TOKEN = localStorage.getItem('token');
    
    if (!TOKEN) {
        console.error('Token not found. Redirecting to login page...');
        return null;
    }

    try {
        const response = await axios.delete(BASE_URL+id);
        return response.status;
    } catch (error) {
        console.error('Error Deleting commande: ', error);
        return null;
    }
}


export default deleteCommande;