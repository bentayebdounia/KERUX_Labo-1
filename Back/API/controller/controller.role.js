const pool = require ("../db")
const queries= require("../queries/queries")

getRoles = (req, res ) => {
    console.log("getting");
    pool.query("SELECT * FROM role", (error, result) => {
        if (error) throw error 
        res.status(200).json(result.rows)
    })
}

getRoleById = (req, res) => {
    const id_role = req.params.id_role
    pool.query(queries.getRoleById, [id_role] , (error, result) => {
        if (error) throw error 
        
        res.status(200).json(result.rows[0])
    })
}

getRoleByNom = (req, res) => {
    const nomRole = req.params.nom_role
    pool.query(queries.getRoleByNom, [nomRole] , (error, result) => {
        if (error) throw error 
        
        res.status(200).json(result.rows[0])
    })
}

postRoles = (req , res ) => {
    console.log("posting");
    const {nom_role} = req.body
    pool.query("INSERT INTO role (nom_role) VALUES($1)", [nom_role], (error, result) => {
        if (error) throw error 
        res.status(200).json(result.rows[1])
    })
}

deleteRoles = (req , res ) => {
    console.log("deleting");
    const id = parseInt(req.params.id_role)
    pool.query("DELETE * FROM role WHERE id_role = $1", [id], (error, result) => {
        if (error) throw error 
        res.status(200).send("delete succefuly")
    })
}

module.exports = {
    getRoles,
    postRoles,
    deleteRoles,
    getRoleByNom,
    getRoleById
}