const pool =require ("../db")
const queries= require("../queries/querie.entrepot")



ajouterEntrepot = (req, res) => {
    var date_enregistrement_entrepot =  new Date 
    var exist = true
    const { nom_entrepot, type_entrepot, air_stockage, capacite, adresse } = req.body
    pool.query(queries.ajouterEntrepot, [nom_entrepot, type_entrepot, air_stockage, capacite, adresse, exist, date_enregistrement_entrepot] ,
             (error, result) =>{
                if (error) throw error
                res.status(200).send("entrepot bien ajouter")
             })
}
getEntrepot = (req, res) => {
    pool.query(queries.getEnrepot, (error, result) => {
        if (error) throw error 
        res.status(200).json(result.rows)
    })
}
getAllEntrepot = (req, res) => {
    pool.query(queries.getAllEnrepots, (error, result) => {
        if (error) throw error 
        res.status(200).json(result.rows)
    })
}

updateEntrepot = (req, res) => {
    const id_entrepot = req.params.id_entrepot;
    
    const { nom_entrepot, type_entrepot,capacite, air_stockage, adresse, exist } = req.body;
    pool.query(
      queries.updateEntrepot,
      [nom_entrepot, type_entrepot, capacite, air_stockage, adresse, exist, id_entrepot],
      (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
      }
    );
}

getNom_entrepotById = (req, res) => {
    const id_entrepot = req.params.id_entrepot;
    pool.query(queries.getNom_entrepotById, [id_entrepot], (error, result) => {
      if (error) throw error;
      res.status(200).json(result.rows);
    });
}

module.exports = {
  ajouterEntrepot,
  getEntrepot,
  getAllEntrepot,
  updateEntrepot,
  getNom_entrepotById,
};