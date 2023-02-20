const pool = require("../db");
const queries = require("../queries/queriesPagination");

countPageBon = (req, res) => {
  pool.query(queries.countBon, (error, result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  });
};

countPageBonFournisseur = (req, res) => {
  const fournisseur = req.params.fournisseur;
  pool.query(
    queries.countBonFournisseur,
    [fournisseur + "%"],
    (error, result) => {
      if (error) throw error;
      res.status(200).json(result.rows);
    }
  );
};

paginationageBon = (req, res) => {
  const limit = req.params.limit;
  const offset = req.params.offset;
  pool.query(queries.paginateBon, [limit, offset], (error, result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  });
};

module.exports = {
  countPageBon,
  countPageBonFournisseur,
  paginationageBon,
};
