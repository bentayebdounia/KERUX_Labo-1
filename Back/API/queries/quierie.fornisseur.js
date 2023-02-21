//ajouter un fournisseur 

const ajouterFourniseur = "INSERT INTO fournisseur (nom_fournisseur, forme_juridique, adresse_fournisseur, email,  activite, modalite_paiement, type_paiement, nature_livraison, categorie , date_enregistement )"
                            +"VALUES($1, $2, $3, $4, $5, $6, $7 , $8, $9, $10) RETURNING id_fournisseur"

const updateFournisseur =
  "UPDATE fournisseur SET nom_fournisseur= $1, forme_juridique= $2 ,adresse_fournisseur = $3, email= $4, activite= $5, modalite_paiement= $6, type_paiement= $7, nature_livraison= $8 , categorie= $9  WHERE id_fournisseur= $10 "; 

const ajouterContact = "INSERT INTO contact (fk_fournisseur, nom_contact, numero_telephone)"
                        +"VALUES($1, $2, $3)"

const getFournisseurByCategorie = "SELECT *FROM fournisseur WHERE categorie ILIKE $1"

const getAllFournisseur = "SELECT * FROM fournisseur ORDER BY id_fournisseur"

const getFournisseurByNomOrCategorie = "SELECT * FROM fournisseur WHERE nom_fournisseur ILIKE $1 OR categorie ILIKE $2"

module.exports = {
  ajouterFourniseur,
  updateFournisseur,
  ajouterContact,
  getFournisseurByCategorie,
  getAllFournisseur,
  getFournisseurByNomOrCategorie,
};
