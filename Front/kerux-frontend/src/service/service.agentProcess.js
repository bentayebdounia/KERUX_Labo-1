import axios from 'axios';

const AJOUTER_AGENT_PROCESS = "http://localhost:8080/agentProcess/ajouter"

 class Service_AgentProcess{
    ajouterAgentProcess (id_process ,id_personne){
        const agentProcess = { id_process ,id_personne }
        return axios.post(AJOUTER_AGENT_PROCESS, agentProcess)
    }
}

export default new Service_AgentProcess()