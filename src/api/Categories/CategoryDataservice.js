import axios from "../Configuration/CustomAxiosConfig";
const BASE_URL = 'http://localhost:8080/api/v1/category'

async function getCategories(){
    const TOKEN = localStorage.getItem('token');
    
    if (!TOKEN) {
        console.error('Token not found. Redirecting to login page...');
        return null;
    }
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching Categories:', error);
        return null;
    }

}

export default getCategories;