import axios from "axios";

const AJOUTER_FOURNISSEUR =
  "http://localhost:8080/fournisseur/ajouterFournisseur";
const MODIFIER_FOURNISSEUR =
  "http://localhost:8080/fournisseur/modifierFournisseur";
const AJOUTER_CONTACT = "http://localhost:8080/fournisseur/ajouetrContact";
const GET_FOURNISSEUR_BY_CATEGORIE =
  "http://localhost:8080/fournisseur/getFournisseurbyCategorie";
const GET_ALL_FOURNISSEUR =
  "http://localhost:8080/fournisseur/getAllFournisseur";

const GET_PAGE_FOURNISSEUR =
  "http://localhost:8080/fournisseur/getPageFounisseur/";
const GET_FOURNISSEUR_BY_NOM_Activite_Id =
  "http://localhost:8080/fournisseur/getFournisseurByNomcategorieId/";

const GET_ID_FOURNISSEUR =
  "http://localhost:8080/fournisseur/getIdFournisseur/";

class ServiceFournisseur {
  ajouterFournisseur(
    id_fournisseur,
    nom_fournisseur,
    forme_juridique,
    r_c,
    a_i,
    n_i_f,
    n_i_s,
    adresse_fournisseur,
    email,
    activite,
    modalite_paiement,
    type_paiement,
    nature_livraison
  ) {
    const fournisseur = {
      id_fournisseur,
      nom_fournisseur,
      forme_juridique,
      adresse_fournisseur,
      email,
      activite,
      modalite_paiement,
      type_paiement,
      nature_livraison,
      r_c,
      a_i,
      n_i_f,
      n_i_s,
    };

    return axios.post(AJOUTER_FOURNISSEUR, fournisseur);
  }
  ajouterContact(fk_fournisseur, nom_contact, numero_telephone) {
    const contact = { fk_fournisseur, nom_contact, numero_telephone };
    return axios.post(AJOUTER_CONTACT, contact);
  }
  modifierFournisseur(
    id_fournisseur,
    nom_fournisseur,
    forme_juridique,
    adresse_fournisseur,
    email,
    activite,
    modalite_paiement,
    type_paiement,
    nature_livraison,
    r_c,
    a_i,
    n_i_f,
    n_i_s
  ) {
    const fournisseur = {
      nom_fournisseur,
      forme_juridique,
      adresse_fournisseur,
      email,
      activite,
      modalite_paiement,
      type_paiement,
      nature_livraison,
      r_c,
      a_i,
      n_i_f,
      n_i_s,
    };
    console.log(id_fournisseur);
    console.log(fournisseur);
    return axios.put(MODIFIER_FOURNISSEUR + "/" + id_fournisseur, fournisseur);
  }
  getFournisseurByCategorie(categorie) {
    return axios.get(GET_FOURNISSEUR_BY_CATEGORIE, categorie);
  }

  getAllFournisseur() {
    return axios.get(GET_ALL_FOURNISSEUR);
  }

  getPageFournisseur(limit, offset) {
    return axios.get(GET_PAGE_FOURNISSEUR+limit+"/"+offset);
  }

  getFournisseurByNomOrActiviteOrId(nom_fournisseur, categoroie) {
    return axios.get(
      GET_FOURNISSEUR_BY_NOM_Activite_Id +
        nom_fournisseur +
        "/" +
        categoroie +
        "/" +
        categoroie
    );
  }

  getIdFournisseure(id_fournisseur) {
    return axios.get(GET_ID_FOURNISSEUR + id_fournisseur);
  }
}

export default new ServiceFournisseur();
