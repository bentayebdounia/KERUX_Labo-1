// -- process Coupage ******************
const ajouterProcessCoup = "INSERT INTO process (categorie, nom_produit, etape, poids, nombre, datee, heure, id_nettoyage, fk_proditFourni, id_gnerate)"
                                +" VALUES ($1, $2, $3, $4, $5, $6, $7 , $8, $9, $10) RETURNING *"

const ajouterProcessCoupHist = "INSERT INTO process_historique (categorie, nom_produit, etape, poids, nombre, datee, heure, id_nettoyage, fk_proditFourni, id_gnerate)"
                                +" VALUES ($1, $2, $3, $4, $5, $6, $7 , $8, $9, $10) "

const ModifyProcessCoup = "UPDATE process SET fk_stock = $1 WHERE  id_coupage = 2$"
const ModifyProcessCoupHist = "UPDATE process_historique SET fk_stock = $1 WHERE  id_coupage = 2$"

// ----recherche by id 
const getProcessByIdSortie= "SELECT id_gnerate, fk_proditfourni , fk_stock, categorie, nom_produit, id_enregistrement, etape , poids , nombre FROM process_historique WHERE id_gnerate= $1  AND etape='nettoyage'"
const getProcessbyIdNettoyage = "SELECT * FROM box_couper WHERE id_nettoyage= $1"

//---------ajouter box_couper
const ajouterBox_couper = " INSERT INTO box_couper (id_produit , id_enregistrement, id_nettoyage, id_generate, datee, heure) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_generate"

module.exports = {
    ajouterProcessCoup,
    ajouterProcessCoupHist,
    getProcessByIdSortie,
    getProcessbyIdNettoyage,
    ajouterBox_couper
}