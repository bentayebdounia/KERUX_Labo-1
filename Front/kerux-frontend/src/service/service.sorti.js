import axios from 'axios'

const KERUX_API_Sortie = "http://localhost:8080/process/sortie/ajouterSortie"
const KERUX_API_TESTID = "http://localhost:8080/process/sortie/getConditionnemet/"
const GET_PROCESSBYDATE_HEURE= "http://localhost:8080/process/sortie/getProcessByDateHeure"
const GET_PROCESSBY_ID = "http://localhost:8080/process/sortie/getProcessByEtapes_idGnerate/"
const GET_PROCESSBY_CATEGORIE ="http://localhost:8080/process/sortie/getProcessByEtapes_categorie/"
const GET_PROCESSBY_PRODUIT ="http://localhost:8080/process/sortie/getProcessByEtapes_produit/"
const GET_PROCESS_ACTUAL = "http://localhost:8080/process/sortie/getActuelle"

const GET_ACTUAL_PROCESS_STOCK = "http://localhost:8080/process/sortie/actualStock"

const GET_CONDITIONNELMENT_TABLE = "http://localhost:8080/process/sortie/getConditionnementTble"
const GET_SORTIE_TABLE = "http://localhost:8080/process/sortie/getSortieTble"


class SortieService {

    ajouterSortie(categorie, nom_produit, etape, poids, nombre, id_enregistrement, id_nettoyage, id_coupage, id_conditionnement, fk_proditFourni){
            //props.categorie, props.typeProd, etape, props.poids, props.nombre, props.id_enregistrement , props.id_nettoyage , props.id_coupage, props.id , props.fk_proditfourni
        const sortieProcess = {categorie, nom_produit, etape, poids, nombre, id_enregistrement,id_nettoyage, id_coupage, id_conditionnement, fk_proditFourni}
        
        return axios.post(KERUX_API_Sortie, sortieProcess)
    }
    getProcesaById (id_gnerate) {
        return axios.get(KERUX_API_TESTID+id_gnerate)
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
    getActualProcess() {
        return axios.get(GET_PROCESS_ACTUAL)
    }
    getActualProcesssStock () {
        return axios.get(GET_ACTUAL_PROCESS_STOCK)
    }

    getConditionnementTable () {
        return axios.get(GET_CONDITIONNELMENT_TABLE)
    }

    getSortieTable () {
        return axios.get(GET_SORTIE_TABLE)
    }

    getActualProcess() {
        return axios.get(GET_PROCESS_ACTUAL)
    }

}

export default new SortieService()