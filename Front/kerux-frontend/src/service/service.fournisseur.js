import axios from 'axios';

const AJOUTER_FOURNISSEUR = "http://localhost:8080/fournisseur/ajouterFournisseur"
const AJOUTER_CONTACT = "http://localhost:8080/fournisseur/ajouetrContact"
const GET_FOURNISSEUR_BY_CATEGORIE = "http://localhost:8080/fournisseur/getFournisseurbyCategorie"
const GET_ALL_FOURNISSEUR = "http://localhost:8080/fournisseur/getAllFournisseur"
const GET_FOURNISSEUR_BY_NOM_CATEGORIE = "http://localhost:8080/fournisseur/getFournisseurByNomCategorie/"

class ServiceFournisseur {

     ajouterFournisseur (nom_fournisseur, forme_juridique, adresse_fournisseur, email,  activite, modalite_paiement, type_paiement, nature_livraison, categorie) {
             const fournisseur = {nom_fournisseur, forme_juridique, adresse_fournisseur, email,  activite, modalite_paiement, type_paiement, nature_livraison, categorie}

             return axios.post(AJOUTER_FOURNISSEUR, fournisseur)
    }
    ajouterContact (fk_fournisseur, nom_contact, numero_telephone){
        const contact = {fk_fournisseur, nom_contact, numero_telephone}
        return axios.post(AJOUTER_CONTACT, contact)
    }
    getFournisseurByCategorie (categorie){
        
        return axios.get(GET_FOURNISSEUR_BY_CATEGORIE, categorie)
    }

    getAllFournisseur(){
        
        return axios.get(GET_ALL_FOURNISSEUR)
    }

    getFournisseurByNomOrCategorie (nom_fournisseur, categoroie) {

        return axios.get(GET_FOURNISSEUR_BY_NOM_CATEGORIE+nom_fournisseur +"/"+ categoroie )
    }


}

export default new ServiceFournisseur()


