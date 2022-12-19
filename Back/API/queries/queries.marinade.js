// -- process Conditionnemet ******************
const ajouterProcessMarinade = "INSERT INTO process (categorie, nom_produit, etape, poids, nombre, marine, mi_cuissan, datee, heure, id_nettoyage, id_coupage, fk_proditFourni, id_gnerate)"
                                +" VALUES ($1, $2, $3, $4, $5, $6, $7 , $8, $9, $10, $11, $12, $13) RETURNING id_gnerate"

const ajouterProcessMarinadeHist = "INSERT INTO process_historique (categorie, nom_produit, etape, poids, nombre, marine, mi_cuissan, datee, heure, id_nettoyage, id_coupage,  fk_proditFourni, id_gnerate)"
                                +" VALUES ($1, $2, $3, $4, $5, $6, $7 , $8, $9,  $10, $11, $12, $13) "

module.exports ={
    ajouterProcessMarinade,
    ajouterProcessMarinadeHist
}
                                