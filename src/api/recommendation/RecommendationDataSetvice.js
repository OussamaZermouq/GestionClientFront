import axios from '../Configuration/CustomAxiosConfig';

const BASE_URL = 'http://localhost:5000/'

async function getRecommendations(client_id){
    axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
    try {
        const response = await axios.get(BASE_URL+client_id);
        return response.data;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return null;
    }
}


export default getRecommendations;