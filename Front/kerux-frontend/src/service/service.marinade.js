import axios from 'axios'

const KERUX_API_MARINADE = "http://localhost:8080/process/marinade/ajouterMarinade/"
const GET_PROCESSBYDATE_HEURE= "http://localhost:8080/process/marinade/getProcessByDateHeure"
const GET_PROCESSBY_ID = "http://localhost:8080/process/marinade/getProcessByEtapes_idGnerate/"
const GET_PROCESSBY_CATEGORIE ="http://localhost:8080/process/marinade/getProcessByEtapes_categorie/"
const GET_PROCESSBY_PRODUIT ="http://localhost:8080/process/marinade/getProcessByEtapes_produit/"

class MarinadeService {

    //categorie, nom_produit, etape, poids, nombre, marine, mi_cuissan, id_nettoyage, id_coupage, fk_proditFourni
    ajouterMarinade(categorie, nom_produit, etape, poids, nombre, marine, mi_cuissan, id_nettoyage, id_coupage, fk_proditFourni){

        const marinadeProcess = {categorie, nom_produit, etape, poids, nombre,marine, mi_cuissan, id_nettoyage, id_coupage, fk_proditFourni}
        
        return axios.post(KERUX_API_MARINADE, marinadeProcess)
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

export default new MarinadeService()