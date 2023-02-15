
// -- process Nettoyage ******************
const ajouterProcessNettoy = "INSERT INTO process (categorie, nom_produit, etape, poids, nombre, datee, heure, id_enregistrement, fk_proditFourni, id_gnerate)"
                                +" VALUES ($1, $2, $3, $4, $5, $6, $7 , $8, $9, $10) RETURNING *"

const ajouterProcessNettoyHist = "INSERT INTO process_historique (categorie, nom_produit, etape, poids, nombre, datee, heure, id_enregistrement, fk_proditFourni, id_gnerate)"
                                +" VALUES ($1, $2, $3, $4, $5, $6, $7 , $8, $9, $10) " 

const ModifyProcessNettoy = "UPDATE process SET fk_stock = $1 WHERE  id_nettoyage = 2$"
const ModifyProcessNettoyHist = "UPDATE process_historique SET fk_stock = $1 WHERE  id_nettoyage = 2$"

///nettoyage
const getProcessByIdNettoyage = "SELECT id_process, fk_proditfourni , fk_stock, categorie, nom_produit, etape FROM process WHERE id_gnerate= $1  AND etape='enregistrement'"
const getProcessbyIdEnregistrement = "SELECT * FROM process WHERE id_enregistrement= $1"



module.exports ={
    ajouterProcessNettoy,
    ajouterProcessNettoyHist, 
    ModifyProcessNettoy,
    ModifyProcessNettoyHist,

    getProcessByIdNettoyage,
    getProcessbyIdEnregistrement,

    
}