//ajouter un fournisseur 

const ajouterFourniseur = "INSERT INTO fournisseur (nom_fournisseur, forme_juridique, adresse_fournisseur, email,  activite, modalite_paiement, type_paiement, nature_livraison, categorie , date_enregistement )"
                            +"VALUES($1, $2, $3, $4, $5, $6, $7 , $8, $9, $10) RETURNING id_fournisseur"

const ajouterContact = "INSERT INTO contact (fk_fournisseur, nom_contact, numero_telephone)"
                        +"VALUES($1, $2, $3)"

const getFournisseurByCategorie = "SELECT *FROM fournisseur WHERE categorie ILIKE $1"

const getAllFournisseur = "SELECT * FROM fournisseur"

const getFournisseurByNomOrCategorie = "SELECT * FROM fournisseur WHERE nom_fournisseur ILIKE $1 OR categorie ILIKE $2"

module.exports ={
    ajouterFourniseur, 
    ajouterContact,
    getFournisseurByCategorie,
    getAllFournisseur,
    getFournisseurByNomOrCategorie
}
