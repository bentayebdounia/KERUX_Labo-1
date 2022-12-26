const pool =require ("../db")
const queries= require("../queries/queries.marinade")
const q= require("../queries/queries")

const dateNow = () => {
    var today = new Date 
    datee = today.getFullYear()+'-'+(today.getMonth() + 1) + '-' + (today.getDate()+1)
    console.log("dateeee "+datee );
    return datee
}

const dateNow2 = () => {
    var today = new Date 
    datee = today.getFullYear()+''+(today.getMonth() + 1) + '' + (today.getDate())
    console.log("dateeee "+datee );
    return datee
}

const HeureNow = () => {
    var today = new Date 
    heure = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    console.log("heure "+heure );
    return heure
}
const TimeNow = () => {
    var today = new Date 
    heure = today.getHours() + '' + today.getMinutes() + '' + today.getSeconds()+ '' + today.getMilliseconds()
    console.log("heure "+heure );
    return heure
}

const generieIdMarinade = (fk_proditFourni, etape ) => {
    
    
    const spl = etape.split('')
    console.log(spl[0]+spl[1])
    var id = (fk_proditFourni+""+spl[0]+spl[1]+""+dateNow2()+""+TimeNow())  
    return id
}

ajouterProcessMarinade =(req, res) => {
    var datee = dateNow()
    var heure = HeureNow()
    const { categorie, nom_produit, etape, poids, nombre, marine, mi_cuissan, id_nettoyage, id_coupage, fk_proditFourni } = req.body
    var id_gnerate = generieIdMarinade(fk_proditFourni,etape)
    pool.query(queries.ajouterProcessMarinade, [categorie, nom_produit, etape, poids, nombre, marine, mi_cuissan, datee, heure, id_nettoyage, id_coupage, fk_proditFourni, id_gnerate ] ,
         (error, result) =>{
            if (error) throw error
            res.status(200).json(result.rows[0])
         })
    pool.query(queries.ajouterProcessMarinadeHist, [categorie, nom_produit, etape, poids, nombre, marine, mi_cuissan, datee, heure, id_nettoyage, id_coupage, fk_proditFourni, id_gnerate ] ,
    (error, result) =>{
        if (error) throw error
        res.status(200)
    })
}
modifierProcessMarinade = (req, res) => {
    const id_marinade = parseInt(req.params.id_marinade)
    const {fk_stock} = req.body
    pool.query(queries.ModifyProcessMarinade,[fk_stock , id_marinade],
        (error, result) =>{
            if (error) throw error
            res.status(200).send("process marinade bien modifier ")
        })
    pool.query(queries.ModifyProcessMarinadeHist,[fk_stock , id_marinade],
        (error, result) =>{
            if (error) throw error
            res.status(200).send("process marinade bien modifier ")
        })

}

getProcessByDateHeure = (req, res) => {
    pool.query(q.getProcessBydateHeure, ['marinade'],
    (error, result) => {
        
         res.status(200).json(result.rows)
    }
    )
}

getProcessByEtapes_categorie = (req, res) => {
    const categorie = req.params.categorie
    pool.query(q.getProcessByEtapes_categorie, ['marinade', categorie+'%'], 
        (error, result) => {
            res.status(200).json(result.rows)
    }
    )
}

getProcessByEtapes_produit = (req, res) => {
    const nom_produit = req.params.nom_produit
    pool.query(q.getProcessByEtapes_produit, ['marinade', nom_produit+'%'], 
        (error, result) => {
            res.status(200).json(result.rows)
    }
    )
}

getProcessByEtapes_idGnerate = (req, res) => {
    const id_gnerate = req.params.id_gnerate
    pool.query(q.getProcessByEtapes_idGnerate, ['marinade', id_gnerate], 
        (error, result) => {
            res.status(200).json(result.rows)  
    }
    )
}

module.exports = {
    ajouterProcessMarinade,
    modifierProcessMarinade,
    getProcessByDateHeure,
    getProcessByEtapes_categorie,
    getProcessByEtapes_produit,
    getProcessByEtapes_idGnerate

}