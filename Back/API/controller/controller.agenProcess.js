const pool =require ("../db")
const queries= require("../queries/queries")

ajouterProcess =(req, res) =>{
    const {id_process, id_personne} = req.body
    pool.query(queries.ajouterAgentProcess, [  id_process, id_personne ] ,
         (error, result) =>{
            
            if (error) throw error
            res.status(200).send("produit bien ajouter")
         })
}

module.exports={
    ajouterProcess
}