

// -- process Sortie ******************

//--********** ajouter ******************************************
const ajouterProcessSortie = "INSERT INTO process (categorie, nom_produit, etape, poids, nombre, datee, heure, id_enregistrement, id_nettoyage, id_coupage, id_conditionnement,  fk_proditFourni, id_gnerate)"
                                +" VALUES ($1, $2, $3, $4, $5, $6, $7 , $8, $9, $10, $11, $12, $13) RETURNING *"

const ajouterProcessSortieHist = "INSERT INTO process_historique (categorie, nom_produit, etape, poids, nombre, datee, heure, id_enregistrement, id_nettoyage, id_coupage, id_conditionnement,  fk_proditFourni, id_gnerate)"
                                +" VALUES ($1, $2, $3, $4, $5, $6, $7 , $8, $9, $10, $11, $12, $13) "

//--********** modifier ******************************************
const ModifyProcessSortie = "UPDATE process SET fk_stock = $1 WHERE  id_sortie = 2$"
const ModifyProcessSortieHist = "UPDATE process_historique SET fk_stock = $1 WHERE  id_sortie = 2$"

//--********** supprimer ******************************************
const supprimerProcess = "DELETE FROM process WHERE id_egnerate= $1"


///sortie
const getProcessByIdSortie= "SELECT id_process,  fk_proditfourni , fk_stock, categorie, nom_produit, id_enregistrement, id_nettoyage, id_coupage, etape FROM process WHERE id_gnerate= $1  AND etape='conditionnement'"
const getProcessbyIdConitionnement = "SELECT * FROM process WHERE id_conditionnement= $1"

module.exports ={
    ajouterProcessSortie,
    ajouterProcessSortieHist,

    ModifyProcessSortie,
    ModifyProcessSortieHist,
    supprimerProcess,

    getProcessByIdSortie,
    getProcessbyIdConitionnement,
}
