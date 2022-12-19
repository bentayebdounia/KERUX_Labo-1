import axios from 'axios';

const PRODUIT_API_LOGIN = "http://localhost:8080/agent/login/";
const PRODUIT_API_ID = "http://localhost:8080/agent/getPersonne/id/";

class LoginServer {
    login(id,password){
        
        return axios.get(PRODUIT_API_LOGIN+id+"/"+password)
    }

    getPersonneById(id){
        return axios.get(PRODUIT_API_ID+id)
    }
}

export default new LoginServer()