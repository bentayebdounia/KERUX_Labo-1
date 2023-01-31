const pool =require ("../db")
const queries= require("../queries/queries.ActualiteProcess")

getProduitEnAttente = (req, res) => {
    const etape = req.params.etape
    var date = new Date
    pool.query(queries.ActualProcess,[ etape , date],
    (error, result) => {
        res.status(200).json(result.rows)  
    }
    )
}
getProduitEnStock = (req, res) => {
    const etape = req.params.etape
    var date = new Date
    pool.query(queries.ActualProcessEnStock, [etape, date] ,
    (error, result) => {
        res.status(200).json(result.rows)  
    }
    )
}

getProduitEnAttenteBlock = (req, res) => {
    const etape = req.params.etape
    var date = new Date
    pool.query(queries.ActualProcessBlock, [etape , date] ,
    (error, result) => {
        res.status(200).json(result.rows)  
    }
    )
}
getProduitEnStockBlock = (req, res) => {
    const etape = req.params.etape
    var date = new Date
    pool.query(queries.ActualProcessEnStockBlock, [etape , date] ,
    (error, result) => {
        res.status(200).json(result.rows)  
    }
    )
}

getIdProcess = ( req, res ) => {
    const etape = req.params.etape
    const id_gnerate = req.params.id_gnerate
    var date = new Date
    pool.query(queries.getIdProcess, [etape , date , id_gnerate] ,
        (error, result) => {
            const notExiste = result.rows.length
                if (notExiste) {
                    res.status(200).json(result.rows[0])
                }
                    else res.send("boxe n'existe pas") 
        }
        )
}
getIdBloquant = ( req, res ) => {
    const etape = req.params.etape
    const id_gnerate = req.params.id_gnerate
    var date = new Date
    pool.query(queries.getIdBloquant, [etape , date , id_gnerate] ,
        (error, result) => {
            const notExiste = result.rows.length
                if (notExiste) {
                    res.status(200).json(result.rows[0])
                }
                    else res.send("boxe n'existe pas")  
        }
        )
}

module.exports = {
    
    getProduitEnAttente,
    getProduitEnStock,
    getProduitEnAttenteBlock,
    getProduitEnStockBlock,
    getIdProcess,
    getIdBloquant
    
}