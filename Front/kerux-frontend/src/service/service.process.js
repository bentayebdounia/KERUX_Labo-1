import axios from 'axios';

const PRODUIT_API_BON = "http://localhost:8080/process/ajouterBon";
const PRODUIT_API_Process = "http://localhost:8080/process/";
const GET_BON_ORDER_BY_DATE = "http://localhost:8080/process/p/getBon"
const GET_BON_ORDER_BY_FOURNISSEUR = "http://localhost:8080/process/a/getbonFournisseur"
const GET_BON_BY_NOM_FOURNISSEUR = "http://localhost:8080/process/getBonByNomFournisseur/"
const GET_PRODUIT_BY_NOM_FOURNISSEUR = "http://localhost:8080/process/getProdByNomFourniseur/"
const GET_PRODUIT_FOURNI = "http://localhost:8080/process/p/get_ProdFourni"

class ProcessService {
    ajouterBon(fk_fournisseur, acheteur, type_bon, recepteur, livreur){

        const bon = { fk_fournisseur, acheteur, type_bon, recepteur, livreur }
        
        return axios.post(PRODUIT_API_BON, bon)
    }

    getProcesaById (id_gnerate) {
        return axios.get(PRODUIT_API_Process+id_gnerate)
    }

    getBonOrderByDate () {
        return axios.get(GET_BON_ORDER_BY_DATE)
    }

    getBonOrder_fournisseur () {
        return axios.get(GET_BON_ORDER_BY_FOURNISSEUR)
    }

    getBonByNomFournisseur (nom_fournisseur) {
        return axios.get(GET_BON_BY_NOM_FOURNISSEUR+nom_fournisseur)
    }
    
    getProduitFourni () {
        return axios.get(GET_PRODUIT_FOURNI)
    }

    getProduitFourniByNomFournisseur (nom_fournisseur) {
        return axios.get( GET_PRODUIT_BY_NOM_FOURNISSEUR+nom_fournisseur)
    }
    
}

export default new ProcessService()