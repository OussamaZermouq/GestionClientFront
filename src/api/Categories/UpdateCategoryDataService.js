import axios from '../Configuration/CustomAxiosConfig';
const BASE_URL = 'http://localhost:8080/api/v1/category/modifyCategory/';


async function updateClient(idCategory, newCategory) {
    const TOKEN = localStorage.getItem('token');
    
    if (!TOKEN) {
        console.error('Token not found. Redirecting to login page...');
        return null;
    }
    try {
        const response = await axios.put(BASE_URL+idCategory,newCategory);
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        return null;
    }
}

export default updateClient;