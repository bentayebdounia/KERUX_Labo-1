import axios from 'axios'

const KERUX_API_CONDIT = "http://localhost:8080/process/conditionnement/ajouterCondit/"
const KERUX_API_TESTID = "http://localhost:8080/process/conditionnement/getIdCoupage/"
const GET_PROCESSBYDATE_HEURE= "http://localhost:8080/process/conditionnement/getProcessByDateHeure"
const GET_PROCESSBY_ID = "http://localhost:8080/process/conditionnement/getProcessByEtapes_idGnerate/"
const GET_PROCESSBY_CATEGORIE ="http://localhost:8080/process/conditionnement/getProcessByEtapes_categorie/"
const GET_PROCESSBY_PRODUIT ="http://localhost:8080/process/conditionnement/getProcessByEtapes_produit/"
const GET_PROCESS_ACTUAL = "http://localhost:8080/process/conditionnement/getActuelle"

const GET_ACTUAL_PROCESS_STOCK = "http://localhost:8080/process/conditionnement/actualStock"

const GET_COUPAGE_TABLE = "http://localhost:8080/process/conditionnement/getCoupageTble"
const GET_CONDITIONNELMENT_TABLE = "http://localhost:8080/process/conditionnement/getConditionnementTble"



class ConditService {

    ajouterConditionnement(categorie, nom_produit, etape, poids, nombre, id_nettoyage, id_coupage, fk_proditFourni){

        const nettoyageProcess = {categorie, nom_produit, etape, poids, nombre, id_nettoyage, id_coupage, fk_proditFourni}
        console.log(nettoyageProcess);
        return axios.post(KERUX_API_CONDIT, nettoyageProcess)
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

    getCoupageTable () {
        return axios.get(GET_COUPAGE_TABLE)
    }

    getConditionnementTable () {
        return axios.get(GET_CONDITIONNELMENT_TABLE)
    }

    getActualProcess() {
        return axios.get(GET_PROCESS_ACTUAL)
    }
}

export default new ConditService()