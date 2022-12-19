import axios from 'axios';


const AGENT_API_Ajouter = "http://localhost:8080/agent/ajouterPersonne";
const AGENT_API_GETALL = "http://localhost:8080/agent/getPersonne/"
const AGENT_API_GETBYID = "http://localhost:8080/agent/getPersonne/id/"
const AGENT_API_GETBYNOM = "http://localhost:8080/agent/getPersonne/nom/"
const AGENT_API_GETBYPRENOM = "http://localhost:8080/agent/getPersonne/prenom/"

class ServiceAdmin {
     ajouterAgent(agent){
        return axios.post(AGENT_API_Ajouter,agent)
     }

     getPersonne (){
      return axios.get(AGENT_API_GETALL)
     }

     getPersonneById(id){
      return axios.get(AGENT_API_GETBYID+id)
     }

     getPersonneByNom(nom){
      return axios.get(AGENT_API_GETBYNOM+nom)
     }

     getPersonneByPrenom(prenom){
      return axios.get(AGENT_API_GETBYPRENOM+prenom)
     }
     
}
export default new ServiceAdmin() 