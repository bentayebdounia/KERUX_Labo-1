import axios from 'axios'

const KERUX_API_Coupage= "http://localhost:8080/process/coupage/ajouterCoupage"
const KERUX_API_TESTID = "http://localhost:8080/process/coupage/getIdCoupage/"
const KERUX_API_BOXCOUPAGE ="http://localhost:8080/process/coupage/ajouterBoxCouper"
const GET_PROCESSBYDATE_HEURE= "http://localhost:8080/process/coupage/getProcessByDateHeure"
const GET_PROCESSBY_ID = "http://localhost:8080/process/coupage/getProcessByEtapes_idGnerate/"
const GET_PROCESSBY_CATEGORIE ="http://localhost:8080/process/coupage/getProcessByEtapes_categorie/"
const GET_PROCESSBY_PRODUIT ="http://localhost:8080/process/coupage/getProcessByEtapes_produit/"
const GET_PROCESS_ACTUAL = "http://localhost:8080/process/conditionnement/getActuelle"

const GET_NETTOYAGE_TABLE = "http://localhost:8080/process/coupage/getNettroyage"
const GET_COUPAGE_TABLE = "http://localhost:8080/process/coupage/getCoupageTble"

class CoupageService {

    ajouterCoupage(categorie, nom_produit, etape, poids, nombre, id_nettoyage, fk_proditFourni, cle){
            //props.categorie, props.typeProd, etape, props.poids, props.nombre, props.id_enregistrement , props.id_nettoyage , props.id_coupage, props.id , props.fk_proditfourni
        const CoupageProcess = {categorie, nom_produit, etape, poids, nombre, id_nettoyage, fk_proditFourni, cle}
        
        return axios.post(KERUX_API_Coupage, CoupageProcess)
    }
    getProcessById (id_gnerate) {
        return axios.get(KERUX_API_TESTID+id_gnerate)
    }

    ajouterBoxCouper (id_produit, id_enregistrement, id_nettoyage, id_generate){
        const boxCouper = {id_produit, id_enregistrement, id_nettoyage, id_generate}
        return axios.post(KERUX_API_BOXCOUPAGE,boxCouper)
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

    getNettoyageTable () {
        return axios.get(GET_NETTOYAGE_TABLE)
    }

    getCoupageTable () {
        return axios.get(GET_COUPAGE_TABLE)
    }

}

export default new CoupageService()