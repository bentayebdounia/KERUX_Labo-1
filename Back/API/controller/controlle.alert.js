const pool =require ("../db")
const queries= require("../queries/queries.alert.js")

ajouterAlert = (req, res) => {
    //var date_alert = new Date
    
    var existe = true
    const { fk_processs, date_alert, etape } = req.body
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

countAlert = (req, res) => {
    const date_alert = req.params.date_alert

    pool.query(queries.countAlert, [date_alert] , 
        (error, result) => {
            if (error) throw error
            res.status(200).json(result.rows)
        })

}

countAlertPrimary = (req, res) => {
    const date_alert = req.params.date_alert

    pool.query(queries.countAlertPrimary, [date_alert] , 
        (error, result) => {
            if (error) throw error
            res.status(200).json(result.rows)
        })

}

countAlertEtape = (req, res) => {
    const date_alert = req.params.date_alert
    const etape = req.params.etape

    pool.query(queries.countAlertEtape, [date_alert, etape] , 
        (error, result) => {
            if (error) throw error
            res.status(200).json(result.rows)
        })

}

countAlertEtapePrimary = (req, res) => {
    const date_alert = req.params.date_alert
    const etape = req.params.etape

    pool.query(queries.countAlertEtapePrimary, [date_alert, etape] , 
        (error, result) => {
            if (error) throw error
            res.status(200).json(result.rows)
        })

}

DataAlert = (req, res) => {
    const date_alert = req.params.date_alert

    pool.query(queries.DataAlert, [date_alert] , 
        (error, result) => {
            if (error) throw error
            res.status(200).json(result.rows)
        })
}
DataAlertPrimary = (req, res) => {
    const date_alert = req.params.date_alert

    pool.query(queries.DataAlertPrimary, [date_alert] , 
        (error, result) => {
            if (error) throw error
            res.status(200).json(result.rows)
        })
}

module.exports = {
    ajouterAlert,
    updateAlert,
    countAlert,
    countAlertPrimary,
    countAlertEtape,
    countAlertEtapePrimary,
    DataAlert,
    DataAlertPrimary
}