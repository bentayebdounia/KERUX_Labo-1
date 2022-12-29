import axios from 'axios';

const CATEGORIE_PRODUIT_FOURNI = "http://localhost:8080/statistique/categorieProduitFourni/"
const TYPE_PRODUIT_FOURNI = "http://localhost:8080/statistique/typeProduitFourni/"
const PROCSS_PRODUIT = "http://localhost:8080/statistique/typeProduitFourniProcess/"

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

    getPocessProd (nom_produit,etape, debut, fin){
        
        return axios.get(PROCSS_PRODUIT+nom_produit+"/"+etape +"/"+debut+"/"+fin)

    }

}

export default new Statistique