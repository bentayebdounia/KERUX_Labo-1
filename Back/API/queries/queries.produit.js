//ajouter categorie
const postCategorie = "INSERT INTO categorie (nom_categorie ) "
                        +"VALUES ($1)"

// ajouter produit
const postProduit = "INSERT INTO produit (fk_categorie, nom_produit, duree_experation) "
                        +"VALUES ($1, $2, $3)"

// get produit
const getProduit = "SELECT * FROM produit"

// get produit by categorie 
const getProduitByCategorie = "SELECT * FROM produit, categorie WHERE fk_categorie=id_categorie AND nom_categorie=$1"

// get categorie
const getCategorie = "SELECT * FROM categorie"
module.exports={
    postCategorie,
    postProduit,
    getProduit,
    getProduitByCategorie,
    getCategorie
}
