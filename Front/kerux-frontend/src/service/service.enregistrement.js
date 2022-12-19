import axios from 'axios'

const PRODUIT_FOURNIT= "http://localhost:8080/process/ajouterProduitFourni"
const ETAPE_ENREGISTREMENT= "http://localhost:8080/process/enregistrement/ajouterEnregistremet"
const GET_PROCESSBYDATE_HEURE= "http://localhost:8080/process/enregistrement/getProcessByDateHeure"
const GET_PROCESSBY_ID = "http://localhost:8080/process/enregistrement/getProcessByEtapes_idGnerate/"
const GET_PROCESSBY_CATEGORIE ="http://localhost:8080/process/enregistrement/getProcessByEtapes_categorie/"
const GET_PROCESSBY_PRODUIT ="http://localhost:8080/process/enregistrement/getProcessByEtapes_produit/"
class EnregistrementService {

    ajouterProduitFournit(categorie, nom_produit,  poids_fourni, nombre_fourni, fk_bon){

        const produitFournit = {categorie, nom_produit,  poids_fourni, nombre_fourni, fk_bon}
        
        return axios.post(PRODUIT_FOURNIT, produitFournit)
    }

    ajouerEnregistrement (categorie, nom_produit, etape, poids, nombre, fk_proditFourni) {
        const enregistrement= {categorie, nom_produit, etape, poids, nombre, fk_proditFourni}
        return axios.post(ETAPE_ENREGISTREMENT, enregistrement )
    }

    getProcessByDateHeure() {
        return axios.get(GET_PROCESSBYDATE_HEURE)
    }
    
    getProcessByEtapes_idGnerate(id_generate) {
        return axios.get(GET_PROCESSBY_ID+id_generate)
    }

    getProcessByEtapes_categorie(categorie) {
        return axios.get(GET_PROCESSBY_CATEGORIE+categorie)
    }

    getProcessByEtapes_produit(nom_produit) {
        return axios.get(GET_PROCESSBY_PRODUIT+nom_produit)
    }


    


}

export default new EnregistrementService()