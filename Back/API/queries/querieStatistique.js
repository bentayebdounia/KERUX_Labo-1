const getCategorieProduitFourni = "SELECT COUNT(*)  FROM produit_fourni WHERE categorie=$1 AND datee>=$2 AND datee<$3"
const getTypeProduitFourni = "SELECT nom_produit, datee FROM produit_fourni WHERE nom_produit=$1 AND datee>=$2 AND datee<$3"
//const getEtapeProcess = "SELECT etape , datee FROM process_historique WHERE etape=$1"

module.exports={
    getCategorieProduitFourni,
    getTypeProduitFourni,
    
}
