import axios from 'axios';

const POST_STOCK = "http://localhost:8080/stock/ajouterStock/"
const PUT_STOCK = "http://localhost:8080/stock/modifierStock/"
const PUT_PROCESS = "http://localhost:8080/process/modifierProcess/"
const GET_STOCK = "http://localhost:8080/stock/getStock"
const GET_STOCK_BY_DATE = "http://localhost:8080/stock/getStockByDate/"
const GET_STOCK_BY_ETAPE = "http://localhost:8080/stock/getStockByEtape/"

class ServiceStock {

    ajouterStock(fk_entrepot){
        const entrepot= {fk_entrepot}
        return axios.post(POST_STOCK,entrepot)
       }

    modifierStock (  poids_sortie, id_stock ) {
        const poids = {poids_sortie}
        return axios.put(PUT_STOCK+id_stock , poids)

    }

    modifierProcess(id_gnerate, fk_stock){
        const stock = {fk_stock}
        return axios.put(PUT_PROCESS+id_gnerate, stock)
    }

    getStock () {
        return axios.get( GET_STOCK)
    }

    getStockByDate (datee) {
        
        return axios.get(GET_STOCK_BY_DATE+datee)
    }

    getStockByEtape (etape) {
        
        return axios.get(GET_STOCK_BY_ETAPE+etape)
    }

}
export default new ServiceStock()