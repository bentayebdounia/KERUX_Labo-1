const pool =require ("../db")
const statistique = require ('../queries/querieStatistique')

getCategorieProduitFourni = (req, res) =>{
    const categorie = req.params.categorie
    const debut = req.params.debut
   const fin = req.params.fin
    


    pool.query(statistique.getCategorieProduitFourni, [categorie, debut , fin] ,
        (error, result) => {
            if (error) throw error
            res.status(200).json(result.rows)
        } )
}

getTypeProduitFourni = (req, res) =>{
    const type = req.params.nom_produit
    const date_debut = req.params.datee
    const date_fin = req.params.datee

    pool.query(statistique.getTypeProduitFourni, [type, date_debut, date_fin ] ,
        (error, result) => {
            if (error) throw error
            res.status(200).json(result.rows)
        } )
}

module.exports = {
    getCategorieProduitFourni,
    getTypeProduitFourni
}