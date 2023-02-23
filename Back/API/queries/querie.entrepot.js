/////// Entrepot *********************************
const ajouterEntrepot =
  "INSERT INTO entrepot ( nom_entrepot, type_entrepot, air_stockage, capacite, adresse, exist ,date_enregistement_entrepot)" +
  "VALUES ( $1, $2, $3, $4, $5, $6, $7 )";
const getEnrepot = "SELECT id_entrepot, nom_entrepot,air_stockage FROM entrepot WHERE exist=TRUE"
const getAllEnrepots = "SELECT * FROM entrepot "
const updateEntrepot =
  "UPDATE entrepot SET nom_entrepot=$1, type_entrepot= $2, capacite=$3,  air_stockage=$4, adresse =$5,  exist=$6  WHERE id_entrepot =$7 ";

module.exports={
    ajouterEntrepot,
    getEnrepot,
    getAllEnrepots,
    updateEntrepot
}