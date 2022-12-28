//*******************BON  */
// count bon
const countBon = "SELECT COUNT (*) FROM bon , fournisseur WHERE fk_fournisseur=id_fournisseur"
//count bonByFournisseur
const countBonFournisseur = "SELECT COUNT (*) FROM bon , fournisseur WHERE fk_fournisseur=id_fournisseur AND nom_fournisseur ILIKE $1  "

//LIMITE bon
const paginateBon = "SELECT * FROM bon , fournisseur WHERE fk_fournisseur=id_fournisseur ORDER BY datee DESC , heure DESC LIMIT $1 OFFSET $2"

//limit bonFournisseur
const paginateBonFournisseur="SELECT * FROM bon , fournisseur WHERE fk_fournisseur=id_fournisseur AND nom_fournisseur ILIKE $1  ORDER BY datee DESC, heure DESC LIMIT $1 OFFSET $2"

module.exports={
    countBon,
    countBonFournisseur,
    paginateBon,
    paginateBonFournisseur
}

