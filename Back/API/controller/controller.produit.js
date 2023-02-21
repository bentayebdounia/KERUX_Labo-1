const pool = require("../db");
const queries = require("../queries/queries.produit");

postCategorie = (req, res) => {
  const { nom_categorie } = req.body;
  pool.query(queries.postCategorie, [nom_categorie], (error, result) => {
    if (error) throw error;
    res.status(200).send("categorie bien ajouter");
  });
};

postProduit = (req, res) => {
  const { fk_categorie, nom_produit, duree_experation } = req.body;
  pool.query(
    queries.postProduit,
    [fk_categorie, nom_produit, duree_experation],
    (error, result) => {
      if (error) throw error;
      res.status(200).send("produit bien ajouter");
    }
  );
};

updateProduit = (req, res) => {
  const id_produit = req.params.id_produit;

  const { nom_produit, duree_experation } = req.body;
  pool.query(
    queries.updateEntrepot,
    [nom_produit, duree_experation, id_produit],
    (error, result) => {
      if (error) throw error;
      res.status(200).json(result.rows);
    }
  );
}

getProduit = (req, res) => {
  pool.query(queries.getProduit, (error, result) => {
    if (error) throw error;

    res.status(200).json(result.rows);
  });
};

getProduitBy_Categorie = (req, res) => {
  const nom_categorie = req.params.nom_categorie;
  pool.query(
    queries.getProduitByCategorie,
    [nom_categorie],
    (error, result) => {
      if (error) throw error;

      res.status(200).json(result.rows);
    }
  );
};

getCategorie = (req, res) => {
  pool.query(queries.getCategorie, (error, result) => {
    if (error) throw error;

    res.status(200).json(result.rows);
  });
};

module.exports = {
  postCategorie,
  postProduit,
  updateProduit,
  getProduit,
  getProduitBy_Categorie,
  getCategorie,
};
