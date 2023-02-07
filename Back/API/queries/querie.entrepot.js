/////// Entrepot *********************************
const ajouterEntrepot = "INSERT INTO entrepot ( nom_entrepot, type_entrepot, air_stockage, capacite, adresse, exist ,date_enregistrement_entrepot)"
                        +"VALUES ( $1, $2, $3, $4, $5, $6, $7 )"
const getEnrepot = "SELECT id_entrepot, nom_entrepot,air_stockage FROM entrepot WHERE exist=TRUE"
const getAllEnrepots = "SELECT * FROM entrepot "
const updateEntrepot = "UPDATE alert SET   air_stockage=$1,  exist=$2  WHERE id_entrepot=$3 "

module.exports={
    ajouterEntrepot,
    getEnrepot,
    getAllEnrepots,
    updateEntrepot
}