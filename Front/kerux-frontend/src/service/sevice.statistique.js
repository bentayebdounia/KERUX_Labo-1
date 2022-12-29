import axios from 'axios';

const CATEGORIE_PRODUIT_FOURNI = "http://localhost:8080/statistique/categorieProduitFourni/"
const TYPE_PRODUIT_FOURNI = "http://localhost:8080/statistique/typeProduitFourni/"

class Statistique {
    
    getCategorieproduitFourni (categorie, debut, fin){
        
        return axios.get(CATEGORIE_PRODUIT_FOURNI+categorie +"/"+debut+"/"+fin)

    }
    getCategorieLegume (categorie, debut, fin){
        
        return axios.get(CATEGORIE_PRODUIT_FOURNI+categorie +"/"+debut+"/"+fin)

    }

    getTypeproduitFourni (nom_produit, debut, fin){
        
        return axios.get(TYPE_PRODUIT_FOURNI+nom_produit +"/"+debut+"/"+fin)

    }

}

export default new Statistique