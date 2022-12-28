import axios from 'axios';

const CATEGORIE_PRODUIT_FOURNI = "http://localhost:8080/statistique/categorieProduitFourni/"
const TYPE_PRODUIT_FOURNI = "http://localhost:8080/statistique/typeProduitFourni/"

class Statistique {
    
    getCategorieproduitFourni (categorie, datee){
        
        return axios.get(CATEGORIE_PRODUIT_FOURNI+categorie +"/"+datee)

    }

    getTypeproduitFourni (nom_produit, datee){
        
        return axios.get(TYPE_PRODUIT_FOURNI+nom_produit +"/"+datee)

    }

}

export default new Statistique