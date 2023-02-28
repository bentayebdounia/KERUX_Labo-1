//ajouter categorie
const postCategorie = "INSERT INTO categorie (nom_categorie ) " + "VALUES ($1)";
// modifier une categorie
const updateCategorie =
  "UPDATE categorie SET nom_categorie= $1  WHERE id_categorie= $2 ";

// ajouter produit
const postProduit =
  "INSERT INTO produit (fk_categorie, nom_produit, duree_experation) " +
  "VALUES ($1, $2, $3)";
// modifier un produit
const updateProduit =
  "UPDATE produit SET nom_produit= $1, duree_experation= $2  WHERE id_produit= $3 ";

// get produit
const getProduit =
  "SELECT * FROM produit, categorie WHERE fk_categorie=id_categorie";

const getPageProduit =
  "SELECT * FROM produit, categorie WHERE fk_categorie=id_categorie  LIMIT $1 OFFSET $2";

// get produit by categorie
const getProduitByCategorie =
  "SELECT * FROM produit, categorie WHERE fk_categorie=id_categorie AND nom_categorie=$1";

// get categorie
const getCategorie = "SELECT * FROM categorie";

module.exports = {
  postCategorie,
  updateCategorie,
  postProduit,
  updateProduit,
  getProduit,
  getPageProduit,
  getProduitByCategorie,
  getCategorie,
};
