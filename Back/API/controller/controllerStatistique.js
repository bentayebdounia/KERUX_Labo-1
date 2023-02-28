const pool = require("../db");
const statistique = require("../queries/querieStatistique");

getCategorieProduitFourni = (req, res) => {
  const categorie = req.params.categorie;
  const debut = req.params.debut;
  const fin = req.params.fin;

  pool.query(
    statistique.getCategorieProduitFourni,
    [categorie, debut, fin],
    (error, result) => {
      if (error) throw error;
      res.status(200).json(result.rows);
    }
  );
};

getTypeProduitFourni = (req, res) => {
  const nom_produit = req.params.nom_produit;
  const debut = req.params.debut;
  const fin = req.params.fin;

  pool.query(
    statistique.getTypeProduitFourni,
    [nom_produit, debut, fin],
    (error, result) => {
      if (error) throw error;
      res.status(200).json(result.rows);
    }
  );
};
getstatProduitProcess = (req, res) => {
  const nom_produit = req.params.nom_produit;
  const etape = req.params.etape;
  const debut = req.params.debut;
  const fin = req.params.fin;

  pool.query(
    statistique.getEtapeProcessProd,
    [nom_produit, etape, debut, fin],
    (error, result) => {
      if (error) throw error;
      res.status(200).json(result.rows);
    }
  );
};
getTableStatProduitProcess = (req, res) => {

}

module.exports = {
  getCategorieProduitFourni,
  getTypeProduitFourni,
  getstatProduitProcess,
};
