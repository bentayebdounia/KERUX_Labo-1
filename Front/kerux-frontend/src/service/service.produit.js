import axios from "axios";


const POST_CATEGORIE = "http://localhost:8080/produit/ajouterCategorie"
const POST_PRODUIT = "http://localhost:8080/produit/ajouterProduit"
const GET_CATEGORIE = "http://localhost:8080/produit/getCategorie"
const GET_PRODUIT = "http://localhost:8080/produit/getProduit"
const GET_PRODUIT_BY_CATEGORIE = "http://localhost:8080/produit/getProduitByCategorie/"

class ServiceProduit {

    ajouterCategorie(nom_categorie){
        
    const categorie = {nom_categorie}
    
    return axios.post(POST_CATEGORIE, categorie)
}
    ajouterProduit(fk_categorie, nom_produit, duree_experation){
        
        const produit = {fk_categorie, nom_produit, duree_experation}
        return axios.post(POST_PRODUIT, produit)
    }

    getCategorie () {
        return axios.get(GET_CATEGORIE)
    }

    getProduit () {
        return axios.get(GET_PRODUIT)
    }

    getProduitByCategorie (nom_categorie) {
        return axios.get(GET_PRODUIT_BY_CATEGORIE+nom_categorie)
    }


}
export default new ServiceProduit ()