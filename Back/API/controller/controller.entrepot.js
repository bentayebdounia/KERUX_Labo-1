const pool =require ("../db")
const queries= require("../queries/queries")



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

module.exports = {
    ajouterEntrepot,
    getEntrepot
}