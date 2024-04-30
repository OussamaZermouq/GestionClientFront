

class AuthenticationService{
    registerSuccessfullLoginUser(email){
        sessionStorage.setItem("userEmail", email);
        console.log("Login Successful");
    }
        
    logout() {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload(false);
    }
  
    isUserLoggedIn() {
        let email = sessionStorage.getItem("userEmail");
        if (email == null) {
            return false;
            } 
        else {
            return true;
        }
    }
        
    getLoggedInUser() {
        let email = sessionStorage.getItem("userEmail");
        if (email == null) {
        return "";
        } else {
        return email;
        }
    }

    setUpToken(jwtToken) {
        localStorage.setItem("token", jwtToken);
    }

}

export default new AuthenticationService();