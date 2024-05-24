import axios from '../Configuration/CustomAxiosConfig';
const BASE_URL = 'http://localhost:8080/api/v1/category';


async function getCategoryById(id) {
    const TOKEN = localStorage.getItem('token');
    
    // Check if token exists
    if (!TOKEN) {
        // Redirect to login page or handle the absence of token
        console.error('Token not found. Redirecting to login page...');
        // Example: window.location.href = '/login';
        return null;
    }

    try {
        const response = await axios.get(BASE_URL+'/'+id);
        return response.data;
    } catch (error) {
        console.error('Error fetching clients:', error);
        return null;
    }
}

export default getCategoryById;