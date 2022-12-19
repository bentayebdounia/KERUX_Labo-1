import axios from 'axios';

const POST_ENTREPOT = "http://localhost:8080/entrepot/ajouterEntrepot";
const GET_ENTREPOT = "http://localhost:8080/entrepot/getEntrepot"

class ServiceEntrepot {

    postEntrepot(nom_entrepot, type_entrepot, air_stockage, capacite, adresse){
        const entrepot = {nom_entrepot, type_entrepot, air_stockage, capacite, adresse}
        return axios.post(
            POST_ENTREPOT, entrepot)
       }

    getEntrepot() {
        return axios.get(GET_ENTREPOT)
    }
}
export default new ServiceEntrepot()