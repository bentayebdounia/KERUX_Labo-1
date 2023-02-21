import axios from "axios";

const POST_ENTREPOT = "http://localhost:8080/entrepot/ajouterEntrepot";
const GET_ENTREPOT = "http://localhost:8080/entrepot/getEntrepot";
const GET_ALL_ENTREPOT = "http://localhost:8080/entrepot/getAllEntrepot";
const UPDATE_ENTREPOT = "http://localhost:8080/entrepot/updateEntrepot";
class ServiceEntrepot {
  postEntrepot(nom_entrepot, type_entrepot, air_stockage, capacite, adresse) {
    const entrepot = {
      nom_entrepot,
      type_entrepot,
      air_stockage,
      capacite,
      adresse,
    };
    return axios.post(POST_ENTREPOT, entrepot);
  }
  updateEntrepot(air_stockage, exist, id_entrepot) {
    const entrepot = { air_stockage, exist };
    return axios.get(UPDATE_ENTREPOT + "/" + id_entrepot, entrepot);
  }

  getEntrepot() {
    return axios.get(GET_ENTREPOT);
  }

  getAllEntrepot() {
    return axios.get(GET_ALL_ENTREPOT);
  }
}
export default new ServiceEntrepot();
