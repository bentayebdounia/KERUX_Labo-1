//ajouter un fournisseur 

const ajouterFourniseur =
  "INSERT INTO fournisseur (id_fournisseur, nom_fournisseur, forme_juridique, adresse_fournisseur, email,  activite, modalite_paiement, type_paiement, nature_livraison, categorie , date_enregistement ,r_c , a_i, n_i_f, n_i_s)" +
  "VALUES($1, $2, $3, $4, $5, $6, $7 , $8, $9, $10, $11, $12, $13, $14 ,$15) ";

const updateFournisseur =
  "UPDATE fournisseur SET nom_fournisseur= $1, forme_juridique= $2 ,adresse_fournisseur = $3, email= $4, activite= $5, modalite_paiement= $6, type_paiement= $7, nature_livraison= $8 , categorie= $9 ,r_c= $10 , a_i= $11, n_i_f= $12, n_i_s= $13  WHERE id_fournisseur= $14 "; 

const ajouterContact = "INSERT INTO contact (fk_fournisseur, nom_contact, numero_telephone)"
  + "VALUES($1, $2, $3)"
              
const getIdFournisseur = "SELECT * FROM fournisseur WHERE id_fournisseur=$1 "

const getFournisseurByCategorie = "SELECT * FROM fournisseur WHERE categorie ILIKE $1"

const getAllFournisseur = "SELECT * FROM fournisseur ORDER BY id_fournisseur"

const getFournisseurByNomOrCategorie = "SELECT * FROM fournisseur WHERE nom_fournisseur ILIKE $1 OR categorie ILIKE $2"

module.exports = {
  ajouterFourniseur,
  updateFournisseur,
  ajouterContact,
  getIdFournisseur,
  getFournisseurByCategorie,
  getAllFournisseur,
  getFournisseurByNomOrCategorie,
};
