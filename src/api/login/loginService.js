import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/auth';

const LoginService = async (email, password) => {
    var body={email:email, password:password};
    console.log(body);
    try {
        const response = await axios.post(BASE_URL+'/authentication',
        JSON.stringify(body), 
        {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    }
    catch(err){
        console.log(err);
        return err;
    }
}

export default LoginService;