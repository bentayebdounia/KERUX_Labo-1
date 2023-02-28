import axios from 'axios';


const AGENT_API_Ajouter = "http://localhost:8080/agent/ajouterPersonne";
const AGENT_API_MODIFIER = "http://localhost:8080/agent/modifierPersonne/";
const AGENT_API_GETALL = "http://localhost:8080/agent/getPersonne/"
const AGENT_API_GETBYID = "http://localhost:8080/agent/getPersonne/"
const AGENT_API_GETBYNOM = "http://localhost:8080/agent/getPersonne/nom/"
const AGENT_API_GETBYPRENOM = "http://localhost:8080/agent/getPersonne/prenom/"
const AGENT_API_GETBYNOMORPRENOM = "http://localhost:8080/agent/getByNomOrPrenom/"
const AGENT_API_GET_PAGE_AGENT = "http://localhost:8080/agent/getPagePersonne/";
class ServiceAdmin {
  ajouterAgent(agent) {
    return axios.post(AGENT_API_Ajouter, agent);
  }

  MODIFIERAgent(
    id_personne,
    nom,
    prenom,
    date_naissance,
    num_tel,
    adresse,
    fonction,
    fk_role,
    mot_passe
  ) {
    const agent = {
      nom,
      prenom,
      date_naissance,
      num_tel,
      adresse,
      fonction,
      fk_role,
      mot_passe,
    };
    console.log(agent);
    return axios.put(AGENT_API_MODIFIER + id_personne, agent);
  }

  getPersonne() {
    return axios.get(AGENT_API_GETALL);
  }
  getPagePersonne(limit,offset) {
    return axios.get(AGENT_API_GET_PAGE_AGENT+limit+"/"+offset);
  }

  getPersonneById(id) {
    return axios.get(AGENT_API_GETBYID + id);
  }

  getPersonneByNom(nom) {
    return axios.get(AGENT_API_GETBYNOM + nom);
  }

  getPersonneByPrenom(prenom) {
    return axios.get(AGENT_API_GETBYPRENOM + prenom);
  }
  getPersonneByNomOrPrenom(nom, prenom) {
    return axios.get(AGENT_API_GETBYNOMORPRENOM + nom + "/" + prenom);
  }
}
export default new ServiceAdmin() 