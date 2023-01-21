// -- process Conditionnemet ******************
const ajouterProcessCond = "INSERT INTO process (categorie, nom_produit, etape, poids, nombre, datee, heure,  id_nettoyage, id_coupage , fk_proditFourni, id_gnerate)"
                                +" VALUES ($1, $2, $3, $4, $5, $6, $7 , $8, $9, $10, $11) RETURNING id_process , id_gnerate"

const ajouterProcessCondHist = "INSERT INTO process_historique (categorie, nom_produit, etape, poids, nombre, datee, heure,  id_nettoyage, id_coupage , fk_proditFourni, id_gnerate)"
                                +" VALUES ($1, $2, $3, $4, $5, $6, $7 , $8, $9, $10, $11) "

const ModifyProcessCond = "UPDATE process SET fk_stock = $1 WHERE  id_conditionnement = 2$"
const ModifyProcessCondHist = "UPDATE process_historique SET fk_stock = $1 WHERE  id_conditionnement = 2$"

///conditionnemet
const getProcessByIdCondit = "SELECT * FROM process WHERE id_gnerate= $1  AND etape='coupage'"
const getProcessbyIdCoupage = "SELECT * FROM process WHERE id_coupage= $1"
module.exports ={
    ajouterProcessCond,
    ajouterProcessCondHist,
    ModifyProcessCond,
    ModifyProcessCondHist,

    getProcessByIdCondit,
    getProcessbyIdCoupage
    
}
