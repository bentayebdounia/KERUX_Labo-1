const pool =require ("../db")
const queries= require("../queries/queries.alert.js")

ajouterAlert = (req, res) => {
    //var date_alert = new Date
    
    var existe = true
    const { fk_processs, date_alert } = req.body
    pool.query(queries.ajouterAlert, [fk_processs,  date_alert, existe], 
        
        (err, result) => {
            if (err) throw err
                res.status(200).send("alert bien ajouter")
        })
}

updateAlert = (req, res) => {
    const fk_processs = req.params.fk_processs
    const { existe } = req.body
    pool.query(queries.updateAlert,[existe, fk_processs],
        (error, result) =>{
            if (error) throw error
            res.status(200).send("alert annuler ")
        })
}

module.exports = {
    ajouterAlert,
    updateAlert
}