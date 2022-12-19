import axios from 'axios';

const PRODUIT_API_ROLE = "http://localhost:8080/api/role/nom/";
const ID_ROLE = "http://localhost:8080/api/role/id/";

class ServiceRole {

    getIdRole(nomRole){
        return axios.get(PRODUIT_API_ROLE+ nomRole)
       }
    
    getNomRole(idRole){
    return axios.get(ID_ROLE+ idRole)
    }
}
export default new ServiceRole()