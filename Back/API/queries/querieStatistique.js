const getCategorieProduitFourni = "SELECT COUNT(*)  FROM produit_fourni WHERE categorie=$1 AND datee>=$2 AND datee<$3"
const getTypeProduitFourni = "SELECT COUNT(*) FROM produit_fourni WHERE nom_produit=$1 AND datee>=$2 AND datee<$3"
const getEtapeProcessProd = "SELECT COUNT(*) FROM process_historique WHERE nom_produit=$1 AND etape=$2 AND datee BETWEEN $3 AND $4;"

module.exports={
    getCategorieProduitFourni,
    getTypeProduitFourni,
    getEtapeProcessProd
    
}
