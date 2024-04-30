import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/auth/';

const registerService = (firstName, lastName, email, passowrd) =>{
    try{
        return axios.post(BASE_URL+'signup', {
            params:{
                firstName,
                lastName,
                email,
                passowrd
            }
        });
        }
    catch(err){
            console.log('Error in Register Service');
            return err;
    }
}

export default registerService;