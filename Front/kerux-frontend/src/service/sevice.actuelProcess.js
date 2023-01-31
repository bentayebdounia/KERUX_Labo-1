import axios from 'axios'

const GET_ACTUAL_PROCESS = "http://localhost:8080/actuelprocess/getActuelle/"
const GET_ACTUAL_PROCESS_STOCK = "http://localhost:8080/actuelprocess/actualStock/"
const GET_ACTUAL_PROCESS_BLOCK = "http://localhost:8080/actuelprocess/getActuelleBlock/"
const GET_ACTUAL_PROCESS_STOCK_BLOCK = "http://localhost:8080/actuelprocess/actualStockBlock/"
const GET_ID_PROCESS = "http://localhost:8080/actuelprocess/getIdProcess/"
const GET_ID_BLOQUANT = "http://localhost:8080/actuelprocess/getIdBloquant/"

class ProcessActuel {

    getActualProcess (etape) {
        return axios.get(GET_ACTUAL_PROCESS+etape)
    }

    getActualProcesssStock (etape) {
        return axios.get(GET_ACTUAL_PROCESS_STOCK+etape)
    }
    
    getActualProcessBlock (etape) {
        return axios.get(GET_ACTUAL_PROCESS_BLOCK+etape)
    }

    getActualProcesssStockBlock (etape) {
        return axios.get(GET_ACTUAL_PROCESS_STOCK_BLOCK+etape)
    }

    getIdProcess (etape, id_gnerate) {
        return axios.get(GET_ID_PROCESS+etape+"/"+id_gnerate)
    }

    getIdBloquant (etape, id_gnerate) {
        return axios.get(GET_ID_BLOQUANT+etape+"/"+id_gnerate)
    }


}

export default new ProcessActuel()