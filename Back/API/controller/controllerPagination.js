const pool =require ("../db")
const queries= require("../queries/queriesPagination")

countPageBon = ( req, res) => {
    pool.query(queries.countBon ,(error, result) => {
        if (error) throw error
        res.status(200).json(result.rows)
    }
    )
}

countPageBonFournisseur = ( req, res) => {
    pool.query(queries.countBonFournisseur ,(error, result) => {
        if (error) throw error
        res.status(200).json(result.rows)
    }
    )
}

paginationageBon = ( req, res) => {
    
    pool.query(queries.paginateBon, [5, 0] ,(error, result) => {
        if (error) throw error
        res.status(200).json(result.rows)
    }
    )
}

module.exports = {
    countPageBon,
    countPageBonFournisseur,
    paginationageBon
}