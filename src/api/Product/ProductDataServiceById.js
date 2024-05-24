import axios from '../Configuration/CustomAxiosConfig';

const BASE_URL = 'http://localhost:8080/api/v1/produit/'

async function getProduitById(product_id){
    const TOKEN = localStorage.getItem('token');
    
    if (!TOKEN) {
        console.error('Token not found. Redirecting to login page...');
        return null;
    }
    try {
        const response = await axios.get(BASE_URL+product_id);
        return response.data;
    } catch (error) {
        console.error('Error fetching Products:', error);
        return null;
    }

}


export default getProduitById;